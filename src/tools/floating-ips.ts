import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { hetznerRequest } from '../services/hetzner.js';
import { toolError, formatResponse } from '../helpers.js';
import { IdSchema, PaginationParams, LabelSelectorParam, LabelsSchema } from '../schemas/common.js';

export function registerFloatingIpTools(server: McpServer): void {
  // List floating IPs
  server.registerTool(
    'hetzner_list_floating_ips',
    {
      title: 'List Floating IPs',
      description: 'List all floating IPs in the project, with optional filtering by name or label.',
      inputSchema: z.object({
        name: z.string().optional().describe('Filter by floating IP name'),
        ...LabelSelectorParam,
        ...PaginationParams,
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('GET', '/floating_ips', undefined, params);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Get floating IP
  server.registerTool(
    'hetzner_get_floating_ip',
    {
      title: 'Get Floating IP',
      description: 'Get details of a specific floating IP by ID.',
      inputSchema: z.object({
        id: IdSchema.describe('Floating IP ID'),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('GET', `/floating_ips/${params.id}`);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Create floating IP
  server.registerTool(
    'hetzner_create_floating_ip',
    {
      title: 'Create Floating IP',
      description: 'Create a new floating IP. Either home_location or server must be provided.',
      inputSchema: z.object({
        type: z.enum(['ipv4', 'ipv6']).describe('IP type'),
        home_location: z.string().optional().describe('Home location name (e.g. "fsn1"). Required if server is not set'),
        server: z.number().int().positive().optional().describe('Server ID to assign the floating IP to. Required if home_location is not set'),
        description: z.string().optional().describe('Description of the floating IP'),
        name: z.string().optional().describe('Name of the floating IP'),
        labels: LabelsSchema,
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('POST', '/floating_ips', params);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Update floating IP
  server.registerTool(
    'hetzner_update_floating_ip',
    {
      title: 'Update Floating IP',
      description: 'Update a floating IP\'s name, description, or labels.',
      inputSchema: z.object({
        id: IdSchema.describe('Floating IP ID'),
        name: z.string().optional().describe('New name'),
        description: z.string().optional().describe('New description'),
        labels: LabelsSchema,
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const { id, ...body } = params;
        const data = await hetznerRequest('PUT', `/floating_ips/${id}`, body);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Delete floating IP
  server.registerTool(
    'hetzner_delete_floating_ip',
    {
      title: 'Delete Floating IP',
      description: 'Delete a floating IP permanently. It must be unassigned first.',
      inputSchema: z.object({
        id: IdSchema.describe('Floating IP ID'),
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('DELETE', `/floating_ips/${params.id}`);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Assign floating IP
  server.registerTool(
    'hetzner_assign_floating_ip',
    {
      title: 'Assign Floating IP',
      description: 'Assign a floating IP to a server in the same location.',
      inputSchema: z.object({
        id: IdSchema.describe('Floating IP ID'),
        server: z.number().int().positive().describe('Server ID to assign the floating IP to'),
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async (params) => {
      try {
        const { id, ...body } = params;
        const data = await hetznerRequest('POST', `/floating_ips/${id}/actions/assign`, body);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Unassign floating IP
  server.registerTool(
    'hetzner_unassign_floating_ip',
    {
      title: 'Unassign Floating IP',
      description: 'Unassign a floating IP from the server it is currently assigned to.',
      inputSchema: z.object({
        id: IdSchema.describe('Floating IP ID'),
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('POST', `/floating_ips/${params.id}/actions/unassign`);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Change floating IP reverse DNS
  server.registerTool(
    'hetzner_change_floating_ip_rdns',
    {
      title: 'Change Floating IP Reverse DNS',
      description: 'Change the reverse DNS entry for a floating IP. Set dns_ptr to null to reset.',
      inputSchema: z.object({
        id: IdSchema.describe('Floating IP ID'),
        ip: z.string().describe('IP address to set the reverse DNS entry for'),
        dns_ptr: z.string().nullable().describe('Reverse DNS PTR record value, or null to reset'),
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const { id, ...body } = params;
        const data = await hetznerRequest('POST', `/floating_ips/${id}/actions/change_dns_ptr`, body);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );
}
