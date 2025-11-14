# Deployment Guide: Teacher Management Web Client

**Application**: Teacher CRUD Web Client  
**Technology**: React 19 + TypeScript + Vite  
**Storage**: IndexedDB (local-first, no backend required)

## Overview

The Teacher Management application is a **static single-page application (SPA)** that runs entirely in the browser. No backend server is required as all data is stored locally in IndexedDB.

## Build Process

### Prerequisites

- Node.js 18+ and npm 9+
- Git (for version control)

### Building for Production

```bash
# Navigate to web-client directory
cd web-client

# Install dependencies
npm install

# Run production build
npm run build
```

**Build Output**:
- Location: `web-client/dist/`
- Contains: Optimized HTML, CSS, JavaScript, and assets
- Size: ~200-300KB (gzipped)

### Build Verification

```bash
# Preview production build locally
npm run preview

# Test in browser at http://localhost:4173
# Verify all CRUD operations work
# Check browser console for errors
```

## Deployment Options

### Option 1: Static File Hosting (Recommended)

Deploy the `dist/` folder to any static hosting service:

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy from dist/ directory
cd dist
netlify deploy --prod
```

Or use Netlify's web UI:
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

#### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or use Vercel's web UI:
1. Import your Git repository
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

#### GitHub Pages

```bash
# Build with correct base path
npm run build -- --base=/repository-name/

# Deploy dist/ folder to gh-pages branch
npx gh-pages -d dist
```

Configure in repository settings:
- Source: `gh-pages` branch
- Folder: `/` (root)

#### AWS S3 + CloudFront

```bash
# Build for production
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Option 2: Docker Container

Create `Dockerfile` in `web-client/`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Build and run:

```bash
# Build Docker image
docker build -t teacher-management .

# Run container
docker run -p 8080:80 teacher-management

# Access at http://localhost:8080
```

## Environment Configuration

### Build-Time Variables

Create `.env.production` for production-specific settings:

```env
# Optional: Base URL for routing
VITE_BASE_URL=/

# Optional: Enable/disable features
VITE_ENABLE_LOGGING=false

# Optional: Analytics (if added in future)
# VITE_ANALYTICS_ID=your-analytics-id
```

Variables are embedded at **build time** (not runtime).

### Runtime Configuration

For dynamic configuration, use a `config.js` file:

1. Create `public/config.js`:
```javascript
window.APP_CONFIG = {
  apiUrl: 'https://api.example.com', // for future backend
  enableLogging: false,
};
```

2. Load in `index.html`:
```html
<script src="/config.js"></script>
```

3. Access in app:
```typescript
const config = (window as any).APP_CONFIG;
```

## Performance Optimization

### Build Optimizations (Already Enabled)

- ✅ **Code Splitting**: Vite automatically splits code
- ✅ **Tree Shaking**: Removes unused code
- ✅ **Minification**: JavaScript and CSS minified
- ✅ **Asset Optimization**: Images and fonts optimized

### Additional Optimizations

#### Compression

Enable gzip/brotli compression on your hosting:

**Netlify**: Automatic  
**Vercel**: Automatic  
**Nginx**: Configure in `nginx.conf` (see above)  
**Apache**: Enable `mod_deflate`

#### Caching Headers

Set aggressive caching for static assets:

```
# Cache hashed assets forever (1 year)
Cache-Control: public, max-age=31536000, immutable

# Don't cache index.html
Cache-Control: no-cache
```

Most static hosts handle this automatically.

### Monitoring Bundle Size

```bash
# Analyze bundle size
npm run build -- --mode=production

# For detailed analysis, add to package.json:
"scripts": {
  "analyze": "vite-bundle-visualizer"
}

npm install -D vite-bundle-visualizer
npm run analyze
```

## Security Considerations

### Content Security Policy (CSP)

Add CSP headers via hosting provider or meta tag:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:;">
```

### HTTPS

**Always use HTTPS in production**. Most hosting providers offer free SSL:
- Netlify: Automatic HTTPS
- Vercel: Automatic HTTPS
- GitHub Pages: Automatic HTTPS
- AWS: Use Certificate Manager

### IndexedDB Security

- Data stored in IndexedDB is **local to the browser**
- Not encrypted by default (browser stores it plaintext)
- Cleared when user clears browser data
- **No sensitive data** should be stored without additional encryption

## Browser Compatibility

### Minimum Requirements

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers: iOS Safari 14+, Chrome Android 90+

### Feature Detection

Application gracefully falls back:
- **IndexedDB** → In-memory storage (if unavailable)
- **Modern JavaScript** → Transpiled by Vite

Check compatibility: `npx browserslist`

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing: `npm test && npm run e2e`
- [ ] Linting passes: `npm run lint`
- [ ] Production build succeeds: `npm run build`
- [ ] Manual testing in preview: `npm run preview`
- [ ] Accessibility audit: Check with axe DevTools extension
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)

### Post-Deployment

- [ ] Verify live site loads correctly
- [ ] Test all CRUD operations (create, edit, delete, view)
- [ ] Check browser console for errors
- [ ] Verify data persists after page reload
- [ ] Test on mobile devices
- [ ] Check page load performance (Lighthouse audit)
- [ ] Verify HTTPS certificate valid

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: web-client/package-lock.json
      
      - name: Install dependencies
        working-directory: ./web-client
        run: npm ci
      
      - name: Run tests
        working-directory: ./web-client
        run: |
          npm run test:unit
          npm run lint
      
      - name: Build
        working-directory: ./web-client
        run: npm run build
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './web-client/dist'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Rollback Strategy

### Static Hosting

Most platforms keep deployment history:

**Netlify**: Deploy → Site deploys → Click previous deployment  
**Vercel**: Deployments → Select previous → Promote to production  
**GitHub Pages**: Revert commit that triggered deployment

### Manual Rollback

```bash
# Build specific version
git checkout v1.0.0
npm run build

# Deploy old version
netlify deploy --prod
```

## Monitoring & Analytics (Optional)

### Performance Monitoring

Add Lighthouse CI for automated performance checks:

```bash
npm install -D @lhci/cli

# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4173'],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 1}],
      },
    },
  },
};
```

### Error Tracking

Consider adding Sentry or similar:

```typescript
// main.tsx
import * as Sentry from '@sentry/react';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'your-sentry-dsn',
    environment: 'production',
  });
}
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Assets Not Loading

Check base URL in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/', // or '/your-app-path/' for subdirectory
});
```

### IndexedDB Not Working

- Check browser console for QuotaExceededError
- Verify user hasn't disabled storage
- Fallback to memory storage is automatic

## Support & Resources

- **Documentation**: See project README.md
- **Architecture**: See specs/001-teacher-crud/architecture.md
- **Issues**: GitHub Issues
- **Vite Docs**: https://vitejs.dev/guide/static-deploy.html

---

**Deployment complete! Your Teacher Management app is live and accessible worldwide.**
