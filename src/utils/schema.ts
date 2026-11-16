import Ajv, { type AnySchema } from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: true });

/**
 * Validates data against a JSON schema.
 * @returns readable violations; an empty array means the data is valid.
 */
export function validateSchema(schema: AnySchema, data: unknown): string[] {
  const validate = ajv.compile(schema);
  validate(data);
  return (validate.errors ?? []).map((e) => `${e.instancePath || '/'} ${e.message}`);
}
