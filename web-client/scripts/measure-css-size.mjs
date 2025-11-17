#!/usr/bin/env node

/**
 * CSS Size Measurement Script
 *
 * Measures the size of CSS bundles to track performance over time.
 * Run with: node scripts/measure-css-size.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { gzipSync } from 'zlib';

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  const stats = statSync(filePath);
  return stats.size;
}

/**
 * Get gzipped size in bytes
 */
function getGzipSize(filePath) {
  const content = readFileSync(filePath);
  const gzipped = gzipSync(content);
  return gzipped.length;
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Find all CSS files in dist directory
 */
function findCSSFiles(dir) {
  const files = [];

  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findCSSFiles(fullPath));
      } else if (extname(entry) === '.css') {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist or not accessible
    return files;
  }

  return files;
}

/**
 * Main measurement function
 */
function measureCSS() {
  console.log('📊 CSS Bundle Size Measurement\n');
  console.log('='.repeat(60));

  // Check if build exists
  const distDir = join(process.cwd(), 'dist');

  try {
    statSync(distDir);
  } catch {
    console.error('❌ Error: dist/ directory not found');
    console.error('   Please run "npm run build" first\n');
    process.exit(1);
  }

  // Find all CSS files
  const cssFiles = findCSSFiles(distDir);

  if (cssFiles.length === 0) {
    console.error('❌ Error: No CSS files found in dist/');
    console.error('   Build may have failed\n');
    process.exit(1);
  }

  // Measure each file
  let totalSize = 0;
  let totalGzip = 0;

  console.log('\nCSS Files:\n');

  for (const file of cssFiles) {
    const size = getFileSize(file);
    const gzip = getGzipSize(file);

    totalSize += size;
    totalGzip += gzip;

    const relativePath = file.replace(process.cwd(), '').replace(/^\//, '');

    console.log(`  ${relativePath}`);
    console.log(`    Raw:     ${formatBytes(size).padStart(10)}`);
    console.log(`    Gzipped: ${formatBytes(gzip).padStart(10)}`);
    console.log('');
  }

  console.log('='.repeat(60));
  console.log('\nTotal CSS Bundle:');
  console.log(`  Raw:     ${formatBytes(totalSize)}`);
  console.log(`  Gzipped: ${formatBytes(totalGzip)}`);

  // Performance recommendations
  console.log('\n📈 Performance Assessment:\n');

  const gzipKB = totalGzip / 1024;

  if (gzipKB < 30) {
    console.log('  ✅ Excellent: CSS bundle is very small (< 30KB gzipped)');
  } else if (gzipKB < 50) {
    console.log('  ✅ Good: CSS bundle is within target (< 50KB gzipped)');
  } else if (gzipKB < 100) {
    console.log('  ⚠️  Warning: CSS bundle is getting large (> 50KB gzipped)');
    console.log('     Consider reviewing unused Tailwind utilities');
  } else {
    console.log('  ❌ Critical: CSS bundle is too large (> 100KB gzipped)');
    console.log(
      '     Action required: Enable Tailwind purge and review config'
    );
  }

  // Tailwind purge check
  console.log('\n🔍 Optimization Checks:\n');

  try {
    const tailwindConfig = readFileSync(
      join(process.cwd(), 'tailwind.config.js'),
      'utf-8'
    );

    if (
      tailwindConfig.includes('content:') ||
      tailwindConfig.includes('purge:')
    ) {
      console.log('  ✅ Tailwind purge configuration found');
    } else {
      console.log('  ⚠️  Warning: Tailwind purge not configured');
      console.log('     Add content paths to tailwind.config.js');
    }
  } catch {
    console.log('  ⚠️  Warning: Could not read tailwind.config.js');
  }

  // Historical comparison (if baseline exists)
  const baselineFile = join(process.cwd(), '.css-size-baseline.json');

  try {
    const baseline = JSON.parse(readFileSync(baselineFile, 'utf-8'));
    const gzipDiff = totalGzip - baseline.gzip;
    const percentChange = ((gzipDiff / baseline.gzip) * 100).toFixed(1);

    console.log('\n📊 Comparison to Baseline:\n');
    console.log(`  Previous: ${formatBytes(baseline.gzip)} gzipped`);
    console.log(`  Current:  ${formatBytes(totalGzip)} gzipped`);

    if (gzipDiff > 0) {
      console.log(`  Change:   +${formatBytes(gzipDiff)} (+${percentChange}%)`);

      if (percentChange > 10) {
        console.log('  ⚠️  Warning: CSS size increased significantly');
      }
    } else if (gzipDiff < 0) {
      console.log(`  Change:   ${formatBytes(gzipDiff)} (${percentChange}%)`);
      console.log('  ✅ Improvement: CSS size decreased');
    } else {
      console.log('  Change:   No change');
    }
  } catch {
    console.log(
      '\n💡 Tip: Run with --save to create baseline for future comparisons'
    );
  }

  // Save baseline if requested
  if (process.argv.includes('--save') || process.argv.includes('-s')) {
    const baseline = {
      date: new Date().toISOString(),
      files: cssFiles.length,
      raw: totalSize,
      gzip: totalGzip,
    };

    import('fs').then(fs => {
      fs.writeFileSync(baselineFile, JSON.stringify(baseline, null, 2));
      console.log(`\n✅ Baseline saved to ${baselineFile}`);
    });
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

// Run measurement
measureCSS();
