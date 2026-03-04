#!/usr/bin/env node
import { createServer, startServer } from './server.js';
import { registerNetworkTools } from './tools/networks.js';
import { registerFirewallTools } from './tools/firewalls.js';
import { registerLoadBalancerTools } from './tools/load-balancers.js';
import { registerCertificateTools } from './tools/certificates.js';

const server = createServer('hetzner-mcp-network');

registerNetworkTools(server);
registerFirewallTools(server);
registerLoadBalancerTools(server);
registerCertificateTools(server);

startServer(server).catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
