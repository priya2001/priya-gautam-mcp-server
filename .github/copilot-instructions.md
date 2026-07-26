# Assistant Profile MCP Server

- Use the official MCP TypeScript server APIs from `@modelcontextprotocol/server` and the Node transport from `@modelcontextprotocol/node`.
- Keep the server single-source-of-truth in `src/server.ts` and `src/profile.ts`.
- Prefer small, typed MCP tools that return text results plus structured data when practical.
- The public HTTP endpoint is `/mcp` and must stay compatible with streamable HTTP clients.
- Stdio mode is the default local debugging path for Claude Code, Claude Desktop, and VS Code MCP debugging.
- Refer to the MCP docs and SDK examples when updating transports or server primitives.