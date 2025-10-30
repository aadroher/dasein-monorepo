/**
 * Simple logger utility with toggle for development/production environments.
 * Provides structured logging for debugging teacher CRUD operations.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

class Logger {
  private enabled: boolean;

  constructor(enabled = false) {
    this.enabled = enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context);
  }

  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): void {
    if (!this.enabled) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    // Use appropriate console method based on log level
    switch (level) {
      case 'debug':
        console.debug(`[${entry.timestamp}] DEBUG: ${message}`, context || '');
        break;
      case 'info':
        console.info(`[${entry.timestamp}] INFO: ${message}`, context || '');
        break;
      case 'warn':
        console.warn(`[${entry.timestamp}] WARN: ${message}`, context || '');
        break;
      case 'error':
        console.error(`[${entry.timestamp}] ERROR: ${message}`, context || '');
        break;
    }
  }
}

// Global logger instance
// Enable in development, disable in production
const isDevelopment =
  (typeof import.meta !== 'undefined' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (import.meta as any).env?.DEV) ??
  false;
export const logger = new Logger(isDevelopment);

// Export the Logger class for testing
export { Logger };
export type { LogLevel, LogEntry };
