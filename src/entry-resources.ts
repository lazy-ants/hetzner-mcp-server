#!/usr/bin/env node
import { createServer, startServer } from './server.js';
import { registerVolumeTools } from './tools/volumes.js';
import { registerFloatingIpTools } from './tools/floating-ips.js';
import { registerPrimaryIpTools } from './tools/primary-ips.js';
import { registerSshKeyTools } from './tools/ssh-keys.js';

const server = createServer('hetzner-mcp-resources');

registerVolumeTools(server);
registerFloatingIpTools(server);
registerPrimaryIpTools(server);
registerSshKeyTools(server);

startServer(server).catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
