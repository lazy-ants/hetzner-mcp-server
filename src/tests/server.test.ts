import { describe, it, expect } from 'vitest';
import { createServer } from '../server.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('../../package.json') as { version: string };

describe('createServer', () => {
  it('returns an McpServer instance without throwing', () => {
    const server = createServer();
    expect(server).toBeDefined();
  });

  it('uses provided name', () => {
    const server = createServer('custom-name');
    expect((server as any).server._serverInfo.name).toBe('custom-name');
  });

  it('reads version from package.json', () => {
    const server = createServer();
    expect((server as any).server._serverInfo.version).toBe(pkg.version);
  });
});
