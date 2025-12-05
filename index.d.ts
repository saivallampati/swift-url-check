export interface IsUrlOptions {
  /**
   * Allow URLs without protocol (default: false)
   * When true, strings like "example.com" will be considered valid
   */
  lenient?: boolean;

  /**
   * Allow localhost and local IPs (default: true)
   * When false, localhost, 127.0.0.1, 192.168.x.x, 10.x.x.x, etc. will be rejected
   */
  allowLocal?: boolean;

  /**
   * Allowed protocols (default: ['http:', 'https:'])
   * Specify which protocols are considered valid
   */
  protocols?: string[];
}

/**
 * Fast and robust URL validator
 * 
 * @param str - The string to validate as a URL
 * @param options - Validation options
 * @returns True if the string is a valid URL, false otherwise
 * 
 * @example
 * ```typescript
 * import isUrl from 'is-url-fast';
 * 
 * isUrl('https://example.com'); // true
 * isUrl('not a url'); // false
 * isUrl('example.com'); // false
 * isUrl('example.com', { lenient: true }); // true
 * ```
 */
export default function isUrl(str: string, options?: IsUrlOptions): boolean;


