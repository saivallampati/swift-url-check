import isUrl from './index.js';

// Test URLs covering different scenarios
const testUrls = [
    'https://example.com',
    'https://sub.domain.example.com/path?query=value#hash',
    'http://192.168.1.1:8080',
    'not-a-url',
    'example.com',
    'https://verylongsubdomain.example.com/very/long/path/with/many/segments',
    'http://localhost:3000',
    'https://user:pass@example.com/api/v1/users?id=123',
    'ftp://example.com',
    'https://github.com/user/repo/issues/123',
];

console.log('=== URL Validator Benchmark ===\n');

// Benchmark swift-url-check
console.log('Testing swift-url-check (this library)...');
const iterations = 100000;

const start = performance.now();
for (let i = 0; i < iterations; i++) {
    for (const url of testUrls) {
        isUrl(url);
    }
}
const end = performance.now();

const totalOps = iterations * testUrls.length;
const timeMs = end - start;
const opsPerSec = (totalOps / timeMs) * 1000;

console.log(`  Iterations: ${iterations.toLocaleString()}`);
console.log(`  URLs per iteration: ${testUrls.length}`);
console.log(`  Total operations: ${totalOps.toLocaleString()}`);
console.log(`  Total time: ${timeMs.toFixed(2)}ms`);
console.log(`  Operations per second: ${opsPerSec.toFixed(0).toLocaleString()}`);
console.log(`  Average per operation: ${(timeMs / totalOps * 1000).toFixed(3)}µs`);

// Try to benchmark is-url-superb if installed
console.log('\n---\n');
try {
    const { default: isUrlSuperb } = await import('is-url-superb');

    console.log('Testing is-url-superb (competitor)...');

    const start2 = performance.now();
    for (let i = 0; i < iterations; i++) {
        for (const url of testUrls) {
            isUrlSuperb(url);
        }
    }
    const end2 = performance.now();

    const timeMs2 = end2 - start2;
    const opsPerSec2 = (totalOps / timeMs2) * 1000;

    console.log(`  Iterations: ${iterations.toLocaleString()}`);
    console.log(`  URLs per iteration: ${testUrls.length}`);
    console.log(`  Total operations: ${totalOps.toLocaleString()}`);
    console.log(`  Total time: ${timeMs2.toFixed(2)}ms`);
    console.log(`  Operations per second: ${opsPerSec2.toFixed(0).toLocaleString()}`);
    console.log(`  Average per operation: ${(timeMs2 / totalOps * 1000).toFixed(3)}µs`);

    console.log('\n=== Performance Comparison ===\n');
    const speedup = timeMs2 / timeMs;
    const percentFaster = ((speedup - 1) * 100).toFixed(1);

    if (speedup > 1) {
        console.log(`✓ swift-url-check is ${speedup.toFixed(2)}x faster (${percentFaster}% improvement)`);
    } else {
        console.log(`✗ swift-url-check is ${(1 / speedup).toFixed(2)}x slower`);
    }

    console.log(`  swift-url-check: ${opsPerSec.toFixed(0).toLocaleString()} ops/sec`);
    console.log(`  is-url-superb: ${opsPerSec2.toFixed(0).toLocaleString()} ops/sec`);

} catch (error) {
    console.log('is-url-superb not installed. To compare:');
    console.log('  npm install is-url-superb');
    console.log('  node benchmark-comparison.js');
    console.log(`  Error: ${error.message}`);
}

console.log('\n=== Individual URL Tests ===\n');

// Test each URL individually to show results
testUrls.forEach(url => {
    const result = isUrl(url);
    const status = result ? '✓ VALID  ' : '✗ INVALID';
    console.log(`${status} | ${url}`);
});
