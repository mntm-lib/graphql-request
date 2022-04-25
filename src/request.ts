import type {
  GraphQLResponse,
  GraphQLVariables
} from './types.js';

import {
  CATEGORY_INTERNAL,
  CATEGORY_NETWORK,
  ERROR_UNEXPECTED,
  gqlErrors
} from './utils.js';

import { options } from './options.js';

export const gqlRequest = <T = unknown>(query: string, variables: GraphQLVariables = {}, operationName: string | null = null): Promise<T> => {
  return fetch(options.url, {
    cache: 'no-store',
    method: 'POST',
    headers: options.headers,
    credentials: 'same-origin',
    body: JSON.stringify({
      operationName,
      query,
      variables
    })
  }).then((response) => {
    if (!response.ok) {
      throw new Error(ERROR_UNEXPECTED);
    }

    return response.json();
  }).then((response: GraphQLResponse<T>) => {
    if (response.errors && response.errors.length > 0) {
      throw response.errors;
    }

    if (response.data) {
      return response.data;
    }

    throw gqlErrors(ERROR_UNEXPECTED, CATEGORY_INTERNAL);
  }, (ex) => {
    if (ex instanceof Error) {
      throw gqlErrors(ex.message, CATEGORY_NETWORK);
    }

    throw gqlErrors(ERROR_UNEXPECTED, CATEGORY_NETWORK);
  });
};
