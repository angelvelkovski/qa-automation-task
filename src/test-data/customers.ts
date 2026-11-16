export interface Customer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/** Test data factory: sensible defaults, override only what a test cares about. */
export function buildCustomer(overrides: Partial<Customer> = {}): Customer {
  return { firstName: 'Ada', lastName: 'Lovelace', postalCode: '10115', ...overrides };
}
