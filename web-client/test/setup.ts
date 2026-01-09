import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// Setup for React 19 testing environment
// This file is automatically loaded before running tests

// Mock HTMLCanvasElement.getContext for jsdom (required by axe-core color contrast checks)
// This prevents "Not implemented" errors without requiring native canvas dependencies
HTMLCanvasElement.prototype.getContext = function () {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: [] }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
    font: '',
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    lineCap: '',
    lineJoin: '',
    miterLimit: 1,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: '',
    globalAlpha: 1,
    globalCompositeOperation: '',
    canvas: {},
  } as unknown as CanvasRenderingContext2D;
};

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

// Add axe-core accessibility matcher
expect.extend(toHaveNoViolations);

// Global test utilities
declare global {
  namespace Vi {
    interface AsymmetricMatchersContaining {
      toHaveNoViolations(): any;
    }
  }
}
