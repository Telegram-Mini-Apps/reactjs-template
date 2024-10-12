/**
 * @returns A complete public URL prefixed with the public static assets base
 * path.
 * @param path - path to prepend prefix to
 */
export function publicUrl(path: string): string {
  return new URL(
    path.replace(/^\/+/, ''),
    window.location.origin + import.meta.env.BASE_URL
  ).toString();
}