import { describe, it, expect } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerServerTools } from '../tools/servers.js';
import { registerImageTools } from '../tools/images.js';
import { registerIsoTools } from '../tools/isos.js';
import { registerPlacementGroupTools } from '../tools/placement-groups.js';
import { registerDatacenterTools } from '../tools/datacenters.js';
import { registerNetworkTools } from '../tools/networks.js';
import { registerFirewallTools } from '../tools/firewalls.js';
import { registerLoadBalancerTools } from '../tools/load-balancers.js';
import { registerCertificateTools } from '../tools/certificates.js';
import { registerVolumeTools } from '../tools/volumes.js';
import { registerFloatingIpTools } from '../tools/floating-ips.js';
import { registerPrimaryIpTools } from '../tools/primary-ips.js';
import { registerSshKeyTools } from '../tools/ssh-keys.js';

function toolCount(server: McpServer): number {
  // _registeredTools is a plain object keyed by tool name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.keys((server as any)._registeredTools).length;
}

function freshServer(name = 'test-server'): McpServer {
  return new McpServer({ name, version: '0.0.0' });
}

describe('Tool registration smoke tests', () => {
  it('registers all 104 tools for full server', () => {
    const server = freshServer();
    registerServerTools(server);
    registerImageTools(server);
    registerIsoTools(server);
    registerPlacementGroupTools(server);
    registerDatacenterTools(server);
    registerNetworkTools(server);
    registerFirewallTools(server);
    registerLoadBalancerTools(server);
    registerCertificateTools(server);
    registerVolumeTools(server);
    registerFloatingIpTools(server);
    registerPrimaryIpTools(server);
    registerSshKeyTools(server);
    expect(toolCount(server)).toBe(104);
  });

  it('registers 36 tools for compute split', () => {
    const server = freshServer();
    registerServerTools(server);
    registerImageTools(server);
    registerIsoTools(server);
    registerPlacementGroupTools(server);
    registerDatacenterTools(server);
    expect(toolCount(server)).toBe(36);
  });

  it('registers 39 tools for network split', () => {
    const server = freshServer();
    registerNetworkTools(server);
    registerFirewallTools(server);
    registerLoadBalancerTools(server);
    registerCertificateTools(server);
    expect(toolCount(server)).toBe(39);
  });

  it('registers 29 tools for resources split', () => {
    const server = freshServer();
    registerVolumeTools(server);
    registerFloatingIpTools(server);
    registerPrimaryIpTools(server);
    registerSshKeyTools(server);
    expect(toolCount(server)).toBe(29);
  });
});
