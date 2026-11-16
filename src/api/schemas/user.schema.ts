const nonEmptyString = { type: 'string', minLength: 1 } as const;

/** Contract for GET /users/{id}. Unknown extra fields are rejected so API drift is noticed. */
export const userSchema = {
  type: 'object',
  required: ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'],
  additionalProperties: false,
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: nonEmptyString,
    username: nonEmptyString,
    email: nonEmptyString,
    phone: nonEmptyString,
    website: nonEmptyString,
    address: {
      type: 'object',
      required: ['street', 'suite', 'city', 'zipcode', 'geo'],
      additionalProperties: false,
      properties: {
        street: nonEmptyString,
        suite: nonEmptyString,
        city: nonEmptyString,
        zipcode: nonEmptyString,
        geo: {
          type: 'object',
          required: ['lat', 'lng'],
          additionalProperties: false,
          properties: { lat: nonEmptyString, lng: nonEmptyString },
        },
      },
    },
    company: {
      type: 'object',
      required: ['name', 'catchPhrase', 'bs'],
      additionalProperties: false,
      properties: { name: nonEmptyString, catchPhrase: nonEmptyString, bs: nonEmptyString },
    },
  },
} as const;
