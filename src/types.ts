type GraphQLPrimitive = string | number | boolean | null;
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style
interface GraphQLEntity {
  [field: string]: GraphQLPrimitive | GraphQLArray | GraphQLEntity;
}
type GraphQLArray = Array<GraphQLPrimitive | GraphQLArray | GraphQLEntity>;
export type GraphQLVariables = Record<string, GraphQLPrimitive | GraphQLEntity | GraphQLArray>;

export type GraphQLErrorLocation = {
  line: number;
  column: number;
};

export type GraphQLError = {
  message: string;
  locations?: GraphQLErrorLocation[];
  path?: Array<string | number>;
  extensions?: Record<string, unknown>;
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

export type GraphQLOptions = {
  url: string;
  headers: Record<string, string>;
};

export type GraphQLNextHandler<T> = (payload: T) => void;
export type GraphQLErrorHandler = (errors: GraphQLError[]) => void;
