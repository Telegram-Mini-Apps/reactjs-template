import { GraphQLError } from 'graphql/error';

export function transformInitData(initData: string): string {
  if (!initData) {
    return '';
  }

  const data = Object.fromEntries(new URLSearchParams(initData));

  return Object.keys(data)
    .filter((key) => key !== 'hash')
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join('\n');
}

export function isGraphqlError(
  error: any, // TODO: Fix this type.
  errorSlug?: string,
) {
  if (!errorSlug) {
    return error?.graphQLErrors?.find(
      (
        _error: GraphQLError, // TODO: use underscore _ in beginning of variable name that are not used.
      ) => true,
    );
  }

  return error?.graphQLErrors?.find((e: GraphQLError) => {
    return e.extensions.code === errorSlug;
  });
}
