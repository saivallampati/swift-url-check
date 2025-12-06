# swift-url-check

> Fast and robust URL validator

## Why?

This library provides a faster and more robust URL validation compared to `is-url-superb`. It uses optimized validation logic with early returns and efficient regex patterns to achieve better performance.

## Features

- ⚡ **Fast** - Optimized for performance with early validation checks
- 🛡️ **Robust** - Comprehensive validation including hostname, protocol, and structure checks
- 🎯 **Flexible** - Configurable options for different use cases
- 📦 **Small** - Zero dependencies
- 🔧 **TypeScript** - Full TypeScript support with type definitions
- 🌐 **ESM & CommonJS** - Supports both module systems

## Install

```bash
npm install swift-url-check
```

## Usage

```javascript
import isUrl from 'swift-url-check';

isUrl('https://opensly.in');
//=> true

isUrl('not a url');
//=> false

isUrl('example.com');
//=> false

isUrl('example.com', { lenient: true });
//=> true
```

### CommonJS

This package is ESM-only. For CommonJS support, use dynamic import:

```javascript
const isUrl = (await import('swift-url-check')).default;

isUrl('https://example.com');
//=> true
```

### TypeScript

```typescript
import isUrl, { IsUrlOptions } from 'swift-url-check';

const options: IsUrlOptions = {
  lenient: true,
  allowLocal: false
};

isUrl('https://example.com', options);
//=> true
```

## API

### isUrl(string, options?)

Returns `true` if the string is a valid URL, `false` otherwise.

#### string

Type: `string`

The string to validate as a URL.

#### options

Type: `object`

##### lenient

Type: `boolean`  
Default: `false`

Allow URLs without protocol. When `true`, strings like `"example.com"` will be considered valid.

```javascript
isUrl('example.com');
//=> false

isUrl('example.com', { lenient: true });
//=> true
```

##### allowLocal

Type: `boolean`  
Default: `true`

Allow localhost and local IP addresses. When `false`, localhost, 127.0.0.1, 192.168.x.x, 10.x.x.x, etc. will be rejected.

```javascript
isUrl('http://localhost:3000');
//=> true

isUrl('http://localhost:3000', { allowLocal: false });
//=> false
```

##### protocols

Type: `string[]`  
Default: `['http:', 'https:']`

Specify which protocols are considered valid.

```javascript
isUrl('ftp://example.com');
//=> false

isUrl('ftp://example.com', { protocols: ['ftp:', 'ftps:'] });
//=> true
```

## Validation Rules

The validator checks for:

- Valid protocol format
- Proper hostname structure
- No whitespace in URLs
- Valid domain parts (labels)
- Proper TLD format
- IPv4 and IPv6 support
- Port number validation
- Path, query, and hash support

## Testing

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Watch mode for development:

```bash
npm run test:watch
```

The library has comprehensive test coverage with 47 test cases covering:
- Basic URL validation
- URL components (paths, query strings, hash fragments, ports)
- Subdomains and IP addresses
- All configuration options
- Edge cases and error conditions

## Performance

Run the benchmark:

```bash
npm run benchmark
```

Compare with is-url-superb:

```bash
npm run benchmark:compare
```

### Benchmark Results

**1.89x faster** than is-url-superb (88.5% improvement)

```
swift-url-check:  3,234,110 ops/sec (0.309µs per operation)
is-url-superb:    1,715,301 ops/sec (0.583µs per operation)
```

This library is optimized for speed with:
- Early type checking
- Fast-path validations before URL parsing
- Efficient regex patterns
- Minimal allocations

## Comparison with is-url-superb

| Feature | swift-url-check | is-url-superb |
|---------|-----------------|---------------|
| Performance | ⚡ 1.89x Faster | Standard |
| TypeScript | ✅ Built-in | ❌ Requires @types |
| ESM Support | ✅ ESM-only | ✅ ESM-only |
| Local URL Control | ✅ Configurable | ❌ No option |
| Protocol Control | ✅ Configurable | ❌ Fixed |
| Dependencies | 0 | 1 (is-url) |

## License

MIT
