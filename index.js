/**
 * Fast and robust URL validator
 * Faster and more reliable than is-url-superb
 * 
 * @param {string} str - The string to validate
 * @param {Object} options - Validation options
 * @param {boolean} options.lenient - Allow URLs without protocol (default: false)
 * @param {boolean} options.allowLocal - Allow localhost and local IPs (default: true)
 * @param {string[]} options.protocols - Allowed protocols (default: ['http:', 'https:'])
 * @returns {boolean} - True if valid URL, false otherwise
 */
export default function isUrl(str, options = {}) {
  // Fast path: type check
  if (typeof str !== 'string' || str.length === 0) {
    return false;
  }

  // Fast path: basic sanity checks before parsing
  const trimmed = str.trim();
  if (trimmed.length === 0 || trimmed.length > 2048) {
    return false; // Empty or unreasonably long
  }

  // Check for whitespace (URLs shouldn't have spaces)
  if (/\s/.test(trimmed)) {
    return false;
  }

  const {
    lenient = false,
    allowLocal = true,
    protocols = ['http:', 'https:']
  } = options;

  let urlString = trimmed;

  // Handle lenient mode (URLs without protocol)
  if (lenient && !/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    urlString = 'https://' + trimmed;
  }

  // Fast path: check if it has a valid protocol prefix
  if (!lenient && !/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    return false;
  }

  try {
    const url = new URL(urlString);

    // Validate protocol
    if (!protocols.includes(url.protocol)) {
      return false;
    }

    // Hostname validation
    const hostname = url.hostname;

    // Must have a hostname
    if (!hostname) {
      return false;
    }

    // Check for valid hostname structure
    // Hostnames should not start or end with dots or hyphens
    if (hostname.startsWith('.') || hostname.endsWith('.') ||
      hostname.startsWith('-') || hostname.endsWith('-')) {
      return false;
    }

    // Local URLs check
    if (!allowLocal) {
      // Block localhost and local IPs
      if (hostname === 'localhost' ||
        /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
        /^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(hostname) ||
        hostname === '::1' || hostname === '::') {
        return false;
      }
    }

    // For non-IP hostnames, validate domain structure
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) &&
      !/^\[[\da-f:]+\]$/i.test(hostname)) {

      // Must have at least one dot (for TLD) unless it's localhost
      if (hostname !== 'localhost' && !hostname.includes('.')) {
        return false;
      }

      // Validate domain parts
      const parts = hostname.split('.');
      for (const part of parts) {
        // Each part must be non-empty and valid
        if (part.length === 0 || part.length > 63) {
          return false;
        }
        // Must contain only valid characters
        if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i.test(part)) {
          return false;
        }
      }

      // TLD should be at least 2 characters (except for special cases like localhost)
      const tld = parts[parts.length - 1];
      if (hostname !== 'localhost' && tld.length < 2) {
        return false;
      }
    }

    // Additional validations for edge cases
    // Check for credentials in URL (some consider this invalid)
    if (url.username || url.password) {
      // Allow but could be optionally disabled
      // For now, we'll allow it as it's technically valid
    }

    return true;
  } catch (error) {
    return false;
  }
}
