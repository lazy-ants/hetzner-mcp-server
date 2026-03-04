import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { IdSchema, PaginationParams, LabelsSchema } from '../schemas/common.js';

describe('IdSchema', () => {
  it('accepts positive integers', () => {
    expect(IdSchema.parse(1)).toBe(1);
  });

  it('rejects zero', () => {
    expect(() => IdSchema.parse(0)).toThrow();
  });

  it('rejects negative numbers', () => {
    expect(() => IdSchema.parse(-1)).toThrow();
  });

  it('rejects floats', () => {
    expect(() => IdSchema.parse(1.5)).toThrow();
  });

  it('rejects non-numbers', () => {
    expect(() => IdSchema.parse('abc')).toThrow();
  });
});

describe('PaginationParams', () => {
  const schema = z.object(PaginationParams);

  it('accepts empty object (all optional)', () => {
    expect(schema.parse({})).toEqual({});
  });

  it('rejects per_page > 50', () => {
    expect(() => schema.parse({ per_page: 51 })).toThrow();
  });

  it('rejects page < 1', () => {
    expect(() => schema.parse({ page: 0 })).toThrow();
  });
});

describe('LabelsSchema', () => {
  it('accepts string record', () => {
    expect(LabelsSchema.parse({ env: 'prod' })).toEqual({ env: 'prod' });
  });

  it('rejects non-string values', () => {
    expect(() => LabelsSchema.parse({ env: 123 })).toThrow();
  });
});
