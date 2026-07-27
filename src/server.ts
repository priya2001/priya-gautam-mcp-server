import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';

import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import { type CallToolResult, McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod/v4';

import { formatRetrieval, listSections, retrieveContext } from './dcr.js';
import { assistantProfile, getProfileMarkdown, profileSections } from './profile.js';

export type TransportMode = 'stdio' | 'http';
type SearchProfileArgs = {
  query: string;
  limit: number;
};

export function buildServer(): McpServer {
  const server = new McpServer({
    name: 'priya-gautam-profile-mcp',
    version: '1.0.0'
  });

  server.registerTool(
    'get-profile',
    {
      description: 'Get a compact overview of Priya Gautam\'s profile, skills, experience, projects, and MCP compatibility.'
    },
    async (): Promise<CallToolResult> => ({
      content: [{ type: 'text', text: getProfileMarkdown() }]
    })
  );

  server.registerTool(
    'get-skills',
    {
      description: 'Get Priya Gautam\'s technical skills and technology stack.'
    },
    async (): Promise<CallToolResult> => ({
      content: [{ type: 'text', text: [
        `Programming Languages: ${assistantProfile.skills.programmingLanguages.join(', ')}`,
        `Frontend: ${assistantProfile.skills.frontend.join(', ')}`,
        `Backend: ${assistantProfile.skills.backend.join(', ')}`,
        `Databases: ${assistantProfile.skills.databases.join(', ')}`,
        `AI & Development Tools: ${assistantProfile.skills.aiAndDevelopmentTools.join(', ')}`,
        `Core CS: ${assistantProfile.skills.coreComputerScience.join(', ')}`
      ].join('\n') }]
    })
  );

  server.registerTool(
    'get-projects',
    {
      description: 'Get Priya Gautam\'s major software projects and their technologies.'
    },
    async (): Promise<CallToolResult> => ({
      content: [{
        type: 'text',
        text: assistantProfile.projects.map(project => [
          `## ${project.name}`,
          `Type: ${project.type}`,
          `Technologies: ${project.technologies.join(', ')}`,
          ...project.details.map(detail => `- ${detail}`)
        ].join('\n')).join('\n\n')
      }]
    })
  );

  server.registerTool(
    'get-education',
    { description: 'Get Priya Gautam\'s education details.' },
    async (): Promise<CallToolResult> => ({
      content: [{
        type: 'text',
        text: assistantProfile.education.map(item => `${item.degree} - ${item.institution} (${item.duration})`).join('\n')
      }]
    })
  );

  server.registerTool(
    'get-experience',
    { description: 'Get Priya Gautam\'s professional experience.' },
    async (): Promise<CallToolResult> => ({
      content: [{
        type: 'text',
        text: assistantProfile.experience.map(item => [
          `${item.role} - ${item.company} (${item.duration})`,
          `Technologies: ${item.technologies.join(', ')}`,
          ...item.responsibilities.map(detail => `- ${detail}`)
        ].join('\n')).join('\n\n')
      }]
    })
  );

  server.registerTool(
    'list-sections',
    {
      description: 'List the profile sections that the DCR engine can retrieve.'
    },
    async (): Promise<CallToolResult> => ({
      content: [
        {
          type: 'text',
          text: listSections()
            .map(section => `${section.id}: ${section.title} - ${section.summary}`)
            .join('\n')
        }
      ]
    })
  );

  server.registerTool(
    'search-priya-profile',
    {
      description: 'Search Priya Gautam\'s professional profile using Dynamic Context Retrieval (DCR). Use this tool whenever the user asks about Priya Gautam\'s education, skills, experience, projects, technologies, certifications, achievements, or professional background.',
      inputSchema: {
        query: z.string().min(1).describe('The user\'s question about Priya Gautam'),
        limit: z.number().int().min(1).max(5).default(3).describe('Maximum number of relevant profile sections to return')
      }
    },
    async ({ query, limit }: SearchProfileArgs): Promise<CallToolResult> => {
      const retrieved = retrieveContext(query, limit);
      return {
        content: [{ type: 'text', text: formatRetrieval(query, retrieved) }]
      };
    }
  );

  // Backward-compatible alias kept for MCP clients that already know the original tool name.
  server.registerTool(
    'search-profile',
    {
      description: 'Search Priya Gautam\'s profile using Dynamic Context Retrieval (DCR). Use it for questions about her education, skills, experience, projects, technologies, certifications, or background.',
      inputSchema: {
        query: z.string().min(1).describe('What the client wants to know about the assistant'),
        limit: z.number().int().min(1).max(5).default(3).describe('Maximum number of sections to return')
      }
    },
    async ({ query, limit }: SearchProfileArgs): Promise<CallToolResult> => {
      const retrieved = retrieveContext(query, limit);
      return {
        content: [{ type: 'text', text: formatRetrieval(query, retrieved) }]
      };
    }
  );

  server.registerTool(
    'explain-dcr',
    {
      description: 'Explain how this server applies Dynamic Context Retrieval to Priya Gautam\'s profile.'
    },
    async (): Promise<CallToolResult> => ({
      content: [
        {
          type: 'text',
          text: [
            `DCR name: ${assistantProfile.dcr.name}`,
            assistantProfile.dcr.description,
            '',
            ...assistantProfile.dcr.behavior.map(item => `- ${item}`)
          ].join('\n')
        }
      ]
    })
  );

  server.registerResource('profile', 'assistant://profile', { title: 'Assistant profile', mimeType: 'text/markdown' }, async uri => ({
    contents: [{ uri: uri.href, mimeType: 'text/markdown', text: getProfileMarkdown() }]
  }));

  server.registerResource('sections', 'assistant://sections', { title: 'Assistant sections', mimeType: 'application/json' }, async uri => ({
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(profileSections, null, 2)
      }
    ]
  }));

  server.registerResource('dcr', 'assistant://dcr', { title: 'DCR explanation', mimeType: 'text/plain' }, async uri => ({
    contents: [
      {
        uri: uri.href,
        text: [
          `${assistantProfile.dcr.name}: ${assistantProfile.dcr.description}`,
          '',
          ...assistantProfile.dcr.behavior.map(item => `- ${item}`)
        ].join('\n')
      }
    ]
  }));

  server.registerPrompt(
    'introduce-assistant',
    {
      title: 'Introduce the assistant',
      description: 'Create a short intro suitable for an MCP client.'
    },
    async () => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Introduce ${assistantProfile.name} as a Software Engineer, Full Stack Developer, and AI Engineering Intern in 2-3 short sentences.`
          }
        }
      ]
    })
  );

  server.registerPrompt(
    'answer-about-me',
    {
      title: 'Answer about me',
      description: 'Use the assistant profile to answer a question about the assistant.'
    },
    async () => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: 'Answer a user question about Priya Gautam using her MCP profile. Use only relevant profile information and keep the response concise, accurate, and concrete.'
          }
        }
      ]
    })
  );

  return server;
}

const CORS_ALLOW_HEADERS = [
  'Accept',
  'Authorization',
  'Content-Type',
  'Last-Event-Id',
  'Last-Event-ID',
  'Mcp-Protocol-Version',
  'Mcp-Session-Id'
].join(', ');

export async function runStdio(): Promise<void> {
  await serveStdio(buildServer);
}

export async function runHttp(port = Number(process.env.PORT ?? '3000'), host = process.env.HOST ?? '0.0.0.0'): Promise<void> {
  console.log("HTTP Server Starting...");

  // One NodeStreamableHTTPServerTransport instance == one MCP session
  // (it stores a single `sessionId` internally, not a map of sessions).
  // Every client connection - Inspector, Claude Desktop, a second browser
  // tab, a reconnect after a dropped connection - must therefore get its
  // own transport (and its own McpServer instance connected to it).
  // Reusing one global transport for every request meant the *first*
  // client to call `initialize` permanently marked that single transport
  // as initialized; every subsequent client's `initialize` call then hit
  // "Invalid Request: Server already initialized", and any request that
  // carried a different (or missing) Mcp-Session-Id was rejected too.
  // That is why MCP Inspector could not connect after the very first use.
  const transports = new Map<string, NodeStreamableHTTPServerTransport>();

  function createSessionTransport(): NodeStreamableHTTPServerTransport {
    const transport = new NodeStreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: sessionId => {
        transports.set(sessionId, transport);
        console.log(`[assistant-profile] session initialized: ${sessionId}`);
      },
      onsessionclosed: sessionId => {
        if (sessionId) {
          transports.delete(sessionId);
          console.log(`[assistant-profile] session closed: ${sessionId}`);
        }
      }
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        transports.delete(transport.sessionId);
      }
    };

    return transport;
  }

  async function resolveTransport(req: import('node:http').IncomingMessage): Promise<NodeStreamableHTTPServerTransport | undefined> {
    const sessionId = req.headers['mcp-session-id'];
    const sessionIdValue = Array.isArray(sessionId) ? sessionId[0] : sessionId;

    if (sessionIdValue) {
      return transports.get(sessionIdValue);
    }

    // No session id: only valid for a brand-new POST /mcp initialize call.
    // Spin up a fresh server + transport pair dedicated to this session.
    if (req.method === 'POST') {
      const session = buildServer();
      const transport = createSessionTransport();
      await session.connect(transport);
      return transport;
    }

    return undefined;
  }

  const httpServer = createServer((req, res) => {
    if (req.url === '/health') {
      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ ok: true, transport: 'http' }));
      return;
    }

    // CORS Preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': CORS_ALLOW_HEADERS,
        'Access-Control-Expose-Headers': 'Mcp-Session-Id',
        'Access-Control-Max-Age': '86400'
      });
      res.end();
      return;
    }

    if (req.url?.startsWith('/mcp')) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');

      console.log("================================");
      console.log("Incoming MCP Request");
      console.log("Method:", req.method);
      console.log("Headers:", req.headers);
      console.log("================================");

      resolveTransport(req)
        .then(transport => {
          if (!transport) {
            res.statusCode = req.method === 'POST' ? 404 : 400;
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({
              jsonrpc: '2.0',
              error: { code: -32001, message: 'Session not found' },
              id: null
            }));
            return;
          }

          return transport.handleRequest(req, res);
        })
        .catch(err => {
          console.error("MCP ERROR:");
          console.error(err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({
              jsonrpc: '2.0',
              error: { code: -32603, message: 'Internal server error' },
              id: null
            }));
          }
        });
      return;
    }

    res.statusCode = 404;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: 'Not found' }));
  });

  await new Promise<void>(resolve => {
    httpServer.listen(port, host, () => {
      console.log(`Listening on ${host}:${port}`);
      resolve();
    });
  });

  process.on('SIGINT', () => {
    for (const transport of transports.values()) {
      void transport.close();
    }
    httpServer.close();
  });

  console.error(`[assistant-profile] HTTP MCP server listening on http://${host}:${port}/mcp`);
}