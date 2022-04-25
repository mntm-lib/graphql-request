import type { GraphQLOptions } from './types.js';

const json = 'application/json' as const;

export const options: GraphQLOptions = {
  url: '/graphql',
  headers: {
    'Accept': json,
    'Content-Type': json
  }
};
