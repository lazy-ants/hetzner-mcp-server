import { describe, it, expect } from 'vitest';
import { toolError, formatResponse } from '../helpers.js';

describe('toolError', () => {
  it('extracts message from Error instances', () => {
    const result = toolError(new Error('fail'));
    expect(result).toEqual({
      content: [{ type: 'text', text: 'Error: fail' }],
      isError: true,
    });
  });

  it('converts string values via String()', () => {
    const result = toolError('string val');
    expect(result).toEqual({
      content: [{ type: 'text', text: 'Error: string val' }],
      isError: true,
    });
  });

  it('converts non-string non-Error values via String()', () => {
    const result = toolError(42);
    expect(result).toEqual({
      content: [{ type: 'text', text: 'Error: 42' }],
      isError: true,
    });
  });
});

describe('formatResponse', () => {
  it('serializes objects as pretty JSON', () => {
    const result = formatResponse({ id: 1 });
    expect(result).toEqual({
      content: [{ type: 'text', text: '{\n  "id": 1\n}' }],
    });
    expect(result).not.toHaveProperty('isError');
  });

  it('serializes null', () => {
    const result = formatResponse(null);
    expect(result).toEqual({
      content: [{ type: 'text', text: 'null' }],
    });
  });
});
