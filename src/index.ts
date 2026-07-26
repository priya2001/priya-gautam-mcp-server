import { runHttp, runStdio, type TransportMode } from './server.js';

function resolveMode(): TransportMode {
  const value = process.env.MCP_TRANSPORT?.toLowerCase();
  return value === 'http' ? 'http' : 'stdio';
}

const mode = resolveMode();

if (mode === 'http') {
  await runHttp();
} else {
  await runStdio();
}