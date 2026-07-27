import { runHttp, runStdio } from './server.js';
function resolveMode() {
    const value = process.env.MCP_TRANSPORT?.toLowerCase();
    return value === 'http' ? 'http' : 'stdio';
}
const mode = resolveMode();
if (mode === 'http') {
    await runHttp();
}
else {
    await runStdio();
}
