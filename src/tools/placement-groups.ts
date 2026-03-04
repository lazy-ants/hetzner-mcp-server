import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { hetznerRequest } from '../services/hetzner.js';
import { toolError, formatResponse } from '../helpers.js';
import { IdSchema, PaginationParams, LabelSelectorParam, LabelsSchema } from '../schemas/common.js';

export function registerPlacementGroupTools(server: McpServer): void {
  // List placement groups
  server.registerTool(
    'hetzner_list_placement_groups',
    {
      title: 'List Placement Groups',
      description: 'List all placement groups in the project.',
      inputSchema: z.object({
        name: z.string().optional().describe('Filter by placement group name'),
        ...LabelSelectorParam,
        ...PaginationParams,
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('GET', '/placement_groups', undefined, params);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Get placement group
  server.registerTool(
    'hetzner_get_placement_group',
    {
      title: 'Get Placement Group',
      description: 'Get details of a specific placement group by ID.',
      inputSchema: z.object({
        id: IdSchema.describe('Placement group ID'),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('GET', `/placement_groups/${params.id}`);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Create placement group
  server.registerTool(
    'hetzner_create_placement_group',
    {
      title: 'Create Placement Group',
      description: 'Create a new placement group to control server distribution across hosts.',
      inputSchema: z.object({
        name: z.string().describe('Name of the placement group'),
        type: z.enum(['spread']).describe('Placement group type'),
        labels: LabelsSchema,
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('POST', '/placement_groups', params);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Update placement group
  server.registerTool(
    'hetzner_update_placement_group',
    {
      title: 'Update Placement Group',
      description: 'Update a placement group\'s name or labels.',
      inputSchema: z.object({
        id: IdSchema.describe('Placement group ID'),
        name: z.string().optional().describe('New placement group name'),
        labels: LabelsSchema,
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const { id, ...body } = params;
        const data = await hetznerRequest('PUT', `/placement_groups/${id}`, body);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  // Delete placement group
  server.registerTool(
    'hetzner_delete_placement_group',
    {
      title: 'Delete Placement Group',
      description: 'Delete a placement group. All servers must be removed from it first.',
      inputSchema: z.object({
        id: IdSchema.describe('Placement group ID'),
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const data = await hetznerRequest('DELETE', `/placement_groups/${params.id}`);
        return formatResponse(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );
}
