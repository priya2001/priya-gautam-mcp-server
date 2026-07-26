import { assistantProfile, profileSections, type ProfileSection } from './profile.js';

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'about',
  'are',
  'be',
  'can',
  'do',
  'for',
  'from',
  'how',
  'i',
  'in',
  'is',
  'it',
  'me',
  'my',
  'of',
  'on',
  'or',
  'please',
  'tell',
  'the',
  'to',
  'what',
  'when',
  'where',
  'who',
  'why',
  'with',
  'you'
]);

export type RetrievedSection = {
  section: ProfileSection;
  score: number;
  reasons: string[];
};

export function retrieveContext(query: string, limit = 3): RetrievedSection[] {
  const normalizedQuery = query.trim().toLowerCase();
  const tokens = tokenize(normalizedQuery);

  const ranked = profileSections
    .map(section => scoreSection(section, tokens, normalizedQuery))
    .sort((left, right) => right.score - left.score || left.section.title.localeCompare(right.section.title));

  const fallback = ranked.find(item => item.section.id === 'overview');

  if (tokens.length === 0) {
    return ranked.slice(0, limit);
  }

  const selected = ranked.filter(item => item.score > 0).slice(0, limit);

  if (selected.length > 0) {
    return selected;
  }

  return fallback ? [fallback] : ranked.slice(0, limit);
}

export function formatRetrieval(query: string, retrieved: RetrievedSection[]): string {
  if (retrieved.length === 0) {
    return [
      `Query: ${query}`,
      '',
      'No strongly matching section was found. Try asking about skills, projects, clients, deployment, or DCR.'
    ].join('\n');
  }

  const lines = [
    `Query: ${query}`,
    `Assistant: ${assistantProfile.name}`,
    '',
    'Relevant context:'
  ];

  for (const item of retrieved) {
    lines.push('', `## ${item.section.title} (${item.score})`, item.section.summary);
    for (const detail of item.section.details.slice(0, 3)) {
      lines.push(`- ${detail}`);
    }
    if (item.reasons.length > 0) {
      lines.push(`- Why this matched: ${item.reasons.join(', ')}`);
    }
  }

  return lines.join('\n');
}

export function listSections(): Array<{ id: string; title: string; summary: string }> {
  return profileSections.map(section => ({
    id: section.id,
    title: section.title,
    summary: section.summary
  }));
}

function scoreSection(section: ProfileSection, tokens: string[], normalizedQuery: string): RetrievedSection {
  let score = 0;
  const reasons: string[] = [];

  if (normalizedQuery.includes(section.title.toLowerCase())) {
    score += 4;
    reasons.push('title match');
  }

  for (const keyword of section.keywords) {
    const normalizedKeyword = keyword.toLowerCase();
    if (normalizedQuery.includes(normalizedKeyword)) {
      score += normalizedKeyword.includes(' ') ? 5 : 3;
      reasons.push(`keyword ${keyword}`);
    }
  }

  const haystack = [section.title, section.summary, ...section.details, ...section.keywords].join(' ').toLowerCase();

  for (const token of tokens) {
    if (STOP_WORDS.has(token)) {
      continue;
    }
    if (haystack.includes(token)) {
      score += token.length > 5 ? 2 : 1;
      reasons.push(`token ${token}`);
    }
  }

  if (section.id === 'overview' && score === 0) {
    score = 1;
    reasons.push('safe default');
  }

  return { section, score, reasons: dedupe(reasons) };
}

function tokenize(input: string): string[] {
  return input.match(/[a-z0-9]+/g)?.filter(token => !STOP_WORDS.has(token)) ?? [];
}

function dedupe(values: string[]): string[] {
  return [...new Set(values)];
}