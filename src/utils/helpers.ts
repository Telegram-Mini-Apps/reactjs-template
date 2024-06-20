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

export function isGraphqlError(error: any, errorSlug?: string) {
  if (!errorSlug) {
    return error?.graphQLErrors?.find((e: GraphQLError) => true);
  }

  return error?.graphQLErrors?.find((e: GraphQLError) => {
    return e.extensions.code === errorSlug;
  });
}
