/**
 * @returns A complete public URL prefixed with the public static assets base
 * path.
 * @param path - path to prepend prefix to
 */
export function publicUrl(path: string): string {
  // The baseUrl must be ending with the slash. The reason is if the baseUrl will
  // equal to "/my-base", then passing the path equal to "tonconnect-manifest.json" will not
  // give us the expected result, it will actually be "/tonconnect-manifest.json", but the expected
  // one is "/my-base/tonconnect-manifest.json". This is due to the URL constructor.
  let baseUrl = import.meta.env.BASE_URL;
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }

  let isBaseAbsolute = false;
  try {
    new URL(baseUrl);
    isBaseAbsolute = true;
  } catch { /* empty */
  }

  return new URL(
    // The path is not allowed to be starting with the slash as long as it will break the
    // base URL. For instance, having the "/my-base/" base URL and path
    // equal to "/tonconnect-manifest.json", we will not get the expected result like
    // "/my-base/tonconnect-manifest.json", but "/tonconnect-manifest.json".
    path.replace(/^\/+/, ''),
    isBaseAbsolute
      ? baseUrl
      : window.location.origin + baseUrl,
  ).toString();
}