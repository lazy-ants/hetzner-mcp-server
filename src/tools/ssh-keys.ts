import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { hetznerRequest } from '../services/hetzner.js';
import { toolError, formatResponse } from '../helpers.js';
import { IdSchema, PaginationParams, LabelSelectorParam, LabelsSchema } from '../schemas/common.js';

export function registerSshKeyTools(server: McpServer): void {
  // List SSH keys
  server.registerTool(
    'hetzner_list_ssh_keys',
    {
      title: 'List SSH Keys',
      description: 'List all SSH keys in the project, with optional filtering by name, label, or fingerprint.',
      inputSchema: z.object({
        name: z.string().optional().describe('Filter by SSH key name'),
        ...LabelSelectorParam,
        fingerprint: z.string().optional().describe('Filter by SSH key fingerprint'),
        ...PaginationParams,
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('GET', '/ssh_keys', undefined, params);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Get SSH key
  server.registerTool(
    'hetzner_get_ssh_key',
    {
      title: 'Get SSH Key',
      description: 'Get details of a specific SSH key by ID.',
      inputSchema: z.object({
        id: IdSchema.describe('SSH key ID'),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('GET', `/ssh_keys/${params.id}`);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Create SSH key
  server.registerTool(
    'hetzner_create_ssh_key',
    {
      title: 'Create SSH Key',
      description: 'Add a new SSH public key to the project for use when creating servers.',
      inputSchema: z.object({
        name: z.string().describe('Name of the SSH key'),
        public_key: z.string().describe('SSH public key content (e.g. "ssh-rsa AAAA...")'),
        labels: LabelsSchema,
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('POST', '/ssh_keys', params);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Update SSH key
  server.registerTool(
    'hetzner_update_ssh_key',
    {
      title: 'Update SSH Key',
      description: 'Update an SSH key\'s name or labels.',
      inputSchema: z.object({
        id: IdSchema.describe('SSH key ID'),
        name: z.string().optional().describe('New SSH key name'),
        labels: LabelsSchema,
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const { id, ...body } = params;
        const data = await hetznerRequest('PUT', `/ssh_keys/${id}`, body);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Delete SSH key
  server.registerTool(
    'hetzner_delete_ssh_key',
    {
      title: 'Delete SSH Key',
      description: 'Delete an SSH key from the project permanently.',
      inputSchema: z.object({
        id: IdSchema.describe('SSH key ID'),
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('DELETE', `/ssh_keys/${params.id}`);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );
}
