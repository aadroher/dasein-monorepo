/**
 * Performance timing utility for measuring operation durations.
 *
 * Provides a simple wrapper around performance.now() for consistent
 * timing measurements across the application.
 */

export interface PerformanceTiming {
  operation: string;
  duration: number;
  timestamp: number;
}

export interface PerformanceTimerResult {
  duration: number;
  end: () => PerformanceTiming;
}

/**
 * Start a performance timer for an operation.
 *
 * @param operation - Name of the operation being timed
 * @returns Timer result with duration and end function
 *
 * @example
 * ```typescript
 * const timer = startTimer('createTeacher');
 * // ... perform operation ...
 * const result = timer.end();
 * console.log(`Operation took ${result.duration}ms`);
 * ```
 */
export const startTimer = (operation: string): PerformanceTimerResult => {
  const startTime = performance.now();
  const startTimestamp = Date.now();

  return {
    get duration() {
      return performance.now() - startTime;
    },
    end: (): PerformanceTiming => {
      const endTime = performance.now();
      return {
        operation,
        duration: endTime - startTime,
        timestamp: startTimestamp,
      };
    },
  };
};

/**
 * Measure the duration of an async operation.
 *
 * @param operation - Name of the operation
 * @param fn - Async function to execute
 * @returns Result of the function execution along with timing
 *
 * @example
 * ```typescript
 * const { result, timing } = await measureAsync('loadTeachers', () =>
 *   storage.getAll()
 * );
 * console.log(`Loaded ${result.data.length} teachers in ${timing.duration}ms`);
 * ```
 */
export const measureAsync = async <T>(
  operation: string,
  fn: () => Promise<T>
): Promise<{ result: T; timing: PerformanceTiming }> => {
  const timer = startTimer(operation);
  const result = await fn();
  const timing = timer.end();
  return { result, timing };
};

/**
 * Measure the duration of a synchronous operation.
 *
 * @param operation - Name of the operation
 * @param fn - Function to execute
 * @returns Result of the function execution along with timing
 *
 * @example
 * ```typescript
 * const { result, timing } = measureSync('sortTeachers', () =>
 *   sortTeachers(teachers)
 * );
 * console.log(`Sorted ${result.length} teachers in ${timing.duration}ms`);
 * ```
 */
export const measureSync = <T>(
  operation: string,
  fn: () => T
): { result: T; timing: PerformanceTiming } => {
  const timer = startTimer(operation);
  const result = fn();
  const timing = timer.end();
  return { result, timing };
};

/**
 * Format timing duration for display.
 *
 * @param duration - Duration in milliseconds
 * @returns Formatted string with appropriate units
 */
export const formatDuration = (duration: number): string => {
  if (duration < 1) {
    return `${(duration * 1000).toFixed(2)}µs`;
  } else if (duration < 1000) {
    return `${duration.toFixed(2)}ms`;
  } else {
    return `${(duration / 1000).toFixed(2)}s`;
  }
};
