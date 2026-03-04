import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export function toolError(err: unknown): CallToolResult {
  const message = err instanceof Error ? err.message : String(err);
  return {
    content: [{ type: 'text', text: `Error: ${message}` }],
    isError: true,
  };
}

export function formatResponse(data: unknown): CallToolResult {
  return {
    content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
  };
}
