/** Money helpers. Everything is computed in integer cents to avoid float drift. */

/** Extracts cents from text such as "Item total: $39.98" or "$9.99". */
export function parseMoneyToCents(text: string): number {
  const match = text.match(/(\d+(?:\.\d{1,2})?)/);
  if (!match) throw new Error(`No amount found in "${text}"`);
  return Math.round(Number(match[1]) * 100);
}

export const sumCents = (values: number[]): number => values.reduce((a, b) => a + b, 0);

/** Tax in cents, rounded to the nearest cent as a shop would. */
export const calculateTaxCents = (subtotalCents: number, rate: number): number =>
  Math.round(subtotalCents * rate);

export const formatCents = (cents: number): string => `$${(cents / 100).toFixed(2)}`;
