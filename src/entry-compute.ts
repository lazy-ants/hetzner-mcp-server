#!/usr/bin/env node
import { createServer, startServer } from './server.js';
import { registerServerTools } from './tools/servers.js';
import { registerImageTools } from './tools/images.js';
import { registerIsoTools } from './tools/isos.js';
import { registerPlacementGroupTools } from './tools/placement-groups.js';
import { registerDatacenterTools } from './tools/datacenters.js';

const server = createServer('hetzner-mcp-compute');

registerServerTools(server);
registerImageTools(server);
registerIsoTools(server);
registerPlacementGroupTools(server);
registerDatacenterTools(server);

startServer(server).catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
