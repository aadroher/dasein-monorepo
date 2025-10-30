/**
 * UUID generation wrapper for testability and consistency.
 * Provides a mockable interface for generating UUIDs in tests.
 */

/**
 * Interface for UUID generation to enable easy mocking in tests
 */
export interface UUIDGenerator {
  generate(): string;
}

/**
 * Production UUID generator using crypto.randomUUID()
 * Falls back to a polyfill if crypto.randomUUID is not available
 */
export class CryptoUUIDGenerator implements UUIDGenerator {
  generate(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback for environments without crypto.randomUUID
    return this.generateFallbackUUID();
  }

  private generateFallbackUUID(): string {
    // Simple UUID v4 implementation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

/**
 * Mock UUID generator for testing - generates predictable UUIDs
 */
export class MockUUIDGenerator implements UUIDGenerator {
  private counter = 0;
  private prefix: string;

  constructor(prefix = 'test') {
    this.prefix = prefix;
  }

  generate(): string {
    this.counter++;
    const paddedCounter = this.counter.toString().padStart(8, '0');
    return `${this.prefix}-${paddedCounter}-0000-0000-000000000000`;
  }

  reset(): void {
    this.counter = 0;
  }
}

// Global UUID generator instance
let uuidGenerator: UUIDGenerator = new CryptoUUIDGenerator();

/**
 * Generate a new UUID using the current generator
 */
export function generateUUID(): string {
  return uuidGenerator.generate();
}

/**
 * Set the UUID generator (useful for testing)
 */
export function setUUIDGenerator(generator: UUIDGenerator): void {
  uuidGenerator = generator;
}

/**
 * Reset to the default crypto UUID generator
 */
export function resetUUIDGenerator(): void {
  uuidGenerator = new CryptoUUIDGenerator();
}

/**
 * Check if the current environment supports crypto.randomUUID
 */
export function isCryptoUUIDSupported(): boolean {
  return (
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
  );
}
