# Design System

## Overview

A comprehensive design system built with Tailwind CSS v4, providing consistent UI components, design tokens, and layout primitives for building accessible, responsive web applications.

**Features:**
- 🎨 **Design Tokens**: Consistent colors, spacing, typography, shadows
- 🧩 **Reusable Components**: Button, Input, Heading, Link, Card
- 📐 **Layout System**: Responsive header, navigation, main content, footer
- ♿ **Accessibility**: WCAG 2.1 AA compliant with automated testing
- 🌓 **Theming**: Light/dark mode with localStorage persistence
- 📱 **Responsive**: Mobile-first design supporting 768px–1920px

## Quick Start

### Import Components

```typescript
import { Button, Input, Heading, Link, Card } from '@/design-system/components';
import { AppLayout, Grid } from '@/design-system/layout';
import { useTheme } from '@/design-system/hooks';
```

### Basic Example

```tsx
import { Button, Input, Card, Heading } from '@/design-system/components';

function MyForm() {
  return (
    <Card>
      <Heading level={2}>Contact Form</Heading>
      <Input id="name" label="Name" value={name} onChange={setName} />
      <Button variant="primary" type="submit">Submit</Button>
    </Card>
  );
}
```

## Components

### Button

```tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

**Variants:** `primary`, `secondary`, `tertiary`  
**Sizes:** `small`, `medium`, `large`

### Input

```tsx
<Input
  id="email"
  label="Email Address"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

**Features:** Labels, error states, helper text, accessibility

### Heading

```tsx
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>
```

**Levels:** 1-6 (maps to h1-h6)

### Link

```tsx
<Link href="/teachers">View Teachers</Link>
<Link href="https://example.com" external>External Link</Link>
```

### Card

```tsx
<Card>
  <Heading level={3}>Card Title</Heading>
  <p>Card content...</p>
</Card>
```

## Layout Components

### AppLayout

```tsx
<AppLayout
  header={<Header>App Title</Header>}
  nav={<NavContainer>...</NavContainer>}
  footer={<Footer>© 2025</Footer>}
>
  {/* Main content */}
</AppLayout>
```

### Grid

```tsx
<Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={4}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

## Design Tokens

Access tokens directly or via Tailwind classes:

```typescript
import { colors, spacing, typography } from '@/design-system/tokens';

const primaryColor = colors.primary[500]; // "#9E5E36"
```

**Tailwind Classes:**
- Colors: `bg-primary-500`, `text-secondary-600`
- Spacing: `p-4`, `m-2`, `gap-6`
- Typography: `text-xl`, `font-bold`
- Radii: `rounded-md`, `rounded-lg`
- Shadows: `shadow-sm`, `shadow-lg`

## Theming

### Theme Toggle

```tsx
import { useTheme } from '@/design-system/hooks';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}
```

Theme automatically persists to localStorage.

## Accessibility

### Features

- ✅ **WCAG 2.1 AA Compliant**: All components tested
- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **Focus Indicators**: Visible focus rings
- ✅ **Screen Readers**: Proper ARIA labels and semantic HTML
- ✅ **Contrast Tested**: Automated contrast validation

### SkipLink

```tsx
import { SkipLink } from '@/design-system/accessibility';

<SkipLink /> {/* Skip to main content */}
```

## Responsive Design

### Breakpoints

```typescript
sm: 640px   // Small tablets
md: 768px   // Tablets (navigation condenses here)
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1440px // Large desktops
```

### Responsive Utilities

```tsx
<div className="px-4 md:px-8 lg:px-12">
  Responsive padding
</div>

<Grid cols={{ sm: 1, md: 2, lg: 3 }}>
  Responsive grid
</Grid>
```

## Testing

All components include comprehensive tests:

```bash
# Run all design system tests
npm test -- test/design-system

# Accessibility tests
npm test -- test/design-system/a11y

# Unit tests
npm test -- test/design-system/unit
```

### Test Coverage

- **123 total tests** across all components
- **Unit tests**: Component behavior and rendering
- **Integration tests**: Layout and responsive behavior
- **Accessibility tests**: WCAG compliance with jest-axe
- **Contrast tests**: Automated color contrast validation
- **E2E tests**: Navigation and user workflows

## Performance

- **CSS Bundle**: ~30KB gzipped (Tailwind purge enabled)
- **Theme Switching**: <16ms (CSS variables, no re-render)
- **Zero Runtime CSS-in-JS**: All styles compiled at build time

Measure CSS size:

```bash
npm run build
node scripts/measure-css-size.mjs
```

## Documentation

- **Quickstart Guide**: `specs/002-layout-design-system/quickstart.md`
- **Architecture Decisions**: `specs/002-layout-design-system/architecture.md`
- **Design Tokens Research**: `specs/002-layout-design-system/research.md`
- **Manual Testing Checklist**: `specs/002-layout-design-system/manual-testing.md`

## Best Practices

### DO ✅

- Use design tokens via Tailwind classes
- Always provide labels for inputs
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Use semantic HTML components
- Test keyboard navigation

### DON'T ❌

- Hardcode colors or spacing
- Create inputs without labels
- Skip heading levels
- Use inline styles
- Use divs as buttons

## Examples

See real-world usage in:
- `src/features/teacher/ui/teacher-create-form.tsx` - Forms
- `src/features/teacher/ui/teacher-list.tsx` - Card grids
- `src/App.tsx` - Layout and theming

## Migration Guide

Converting existing components to use the design system:

```diff
// Before
- <button className="bg-blue-500 text-white px-4 py-2 rounded">
-   Click Me
- </button>
+ <Button variant="primary">Click Me</Button>

// Before
- <input type="text" className="border p-2" />
+ <Input id="name" label="Name" value={name} onChange={setName} />

// Before
- <h2 className="text-2xl font-bold">Title</h2>
+ <Heading level={2}>Title</Heading>
```

## Contributing

When adding new components:

1. Follow the variant + size pattern
2. Include accessibility tests (jest-axe)
3. Support className prop for customization
4. Document in quickstart.md
5. Add to barrel export in `design-system/index.ts`

## License

Part of the Dasein Monorepo project.
