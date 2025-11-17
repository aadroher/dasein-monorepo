# Quickstart Guide: Design System

**Feature**: 002-layout-design-system  
**Audience**: Developers using the design system  
**Date**: 2025-11-17

## Overview

This guide helps developers quickly start using the design system for building consistent, accessible UI components.

---

## Installation

The design system is already integrated in the web-client. No additional installation needed.

```bash
cd web-client
npm install  # If starting fresh
```

---

## Design Tokens

### Using Tokens in Components

Import tokens directly for custom logic:

```typescript
import { colors, spacing, typography } from '@/design-system/tokens';

// Access token values
const primaryColor = colors.primary[500]; // "#9E5E36"
const baseSpacing = spacing[4]; // "1rem"
```

### Using Tokens via Tailwind

Preferred method - use Tailwind utility classes:

```tsx
<div className="bg-primary-500 text-white p-4 rounded-md">
  Primary colored box with 1rem padding
</div>
```

**Available Token Classes**:
- **Colors**: `bg-primary-*`, `text-primary-*`, `border-primary-*` (50-900 scale)
- **Spacing**: `p-*`, `m-*`, `gap-*` (0-20 scale, `p-4` = 1rem)
- **Typography**: `text-xs` to `text-4xl`, `font-normal` to `font-bold`
- **Radii**: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`
- **Shadows**: `shadow-sm`, `shadow-md`, `shadow-lg`

---

## Core Components

### Button

```tsx
import { Button } from '@/design-system/components';

// Variants: primary (default), secondary, tertiary
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>

// Sizes: small, medium (default), large
<Button size="large">Large Button</Button>

// As submit button
<Button type="submit" variant="secondary">
  Submit Form
</Button>

// Disabled state
<Button disabled>Cannot Click</Button>
```

**Props**:
- `variant?`: 'primary' | 'secondary' | 'tertiary' (default: 'primary')
- `size?`: 'small' | 'medium' | 'large' (default: 'medium')
- `type?`: 'button' | 'submit' | 'reset' (default: 'button')
- `disabled?`: boolean
- `className?`: string (additional Tailwind classes)
- `children`: ReactNode
- Standard button HTML attributes

---

### Input

```tsx
import { Input } from '@/design-system/components';

// Basic usage (always include label for accessibility)
<Input
  id="name"
  label="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter your name"
/>

// With error state
<Input
  id="email"
  label="Email"
  value={email}
  onChange={handleChange}
  error={errors.email} // "Invalid email format"
  required
/>

// With helper text
<Input
  id="username"
  label="Username"
  value={username}
  onChange={handleChange}
  helperText="Must be 3-20 characters"
/>

// Different input types
<Input type="password" label="Password" />
<Input type="email" label="Email" />
<Input type="number" label="Age" />
```

**Props**:
- `id`: string (required for label association)
- `label`: string (required for accessibility)
- `value`: string
- `onChange`: (e: ChangeEvent<HTMLInputElement>) => void
- `type?`: 'text' | 'email' | 'password' | 'number' | 'tel' | ... (default: 'text')
- `placeholder?`: string
- `error?`: string (displays error message)
- `helperText?`: string (displays muted helper text)
- `required?`: boolean
- `disabled?`: boolean
- `className?`: string
- Standard input HTML attributes

---

### Heading

```tsx
import { Heading } from '@/design-system/components';

// Levels: 1-6 (maps to h1-h6)
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection Title</Heading>

// Custom styling (maintains semantic HTML)
<Heading level={2} className="text-primary-600">
  Colored Heading
</Heading>
```

**Props**:
- `level`: 1 | 2 | 3 | 4 | 5 | 6 (required)
- `children`: ReactNode
- `className?`: string (additional classes)
- Standard heading HTML attributes

**Accessibility Note**: Always maintain proper heading hierarchy (don't skip levels, e.g., h1 → h3).

---

### Link

```tsx
import { Link } from '@/design-system/components';

// Internal link
<Link href="/teachers">View Teachers</Link>

// External link (automatically adds target="_blank" and rel)
<Link href="https://example.com" external>
  External Resource
</Link>

// With aria-label for accessibility
<Link href="/profile" aria-label="View your profile">
  Profile
</Link>

// Custom styling
<Link href="/about" className="font-bold">
  About Us
</Link>
```

**Props**:
- `href`: string (required)
- `external?`: boolean (opens in new tab with security attributes)
- `children`: ReactNode
- `className?`: string
- Standard anchor HTML attributes

---

### Card

```tsx
import { Card } from '@/design-system/components';

// Basic card
<Card>
  <Heading level={3}>Card Title</Heading>
  <p>Card content goes here.</p>
</Card>

// With custom padding
<Card className="p-8">
  Large padding card
</Card>

// Grid of cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>
```

**Props**:
- `children`: ReactNode
- `className?`: string (additional classes)
- Standard div HTML attributes

---

## Layout Components

### AppLayout

Wrap your entire application for consistent layout:

```tsx
import { AppLayout } from '@/design-system/layout';

function App() {
  return (
    <AppLayout
      header={<Header>My App</Header>}
      nav={<NavContainer>...</NavContainer>}
      footer={<Footer>© 2025</Footer>}
    >
      {/* Main content */}
      <Heading level={1}>Welcome</Heading>
      <p>Page content...</p>
    </AppLayout>
  );
}
```

**Props**:
- `header?`: ReactNode (header content)
- `nav?`: ReactNode (navigation content)
- `footer?`: ReactNode (footer content)
- `children`: ReactNode (main content)

---

### Individual Layout Components

```tsx
import { Header, NavContainer, MainContainer, Footer } from '@/design-system/layout';

// Header
<Header>
  <h1 className="text-2xl font-bold">App Title</h1>
</Header>

// Navigation (semantic <nav> element)
<NavContainer aria-label="Main navigation">
  <Link href="/">Home</Link>
  <Link href="/about">About</Link>
</NavContainer>

// Main content (semantic <main> with max-width)
<MainContainer>
  <Heading level={1}>Page Title</Heading>
  {/* content */}
</MainContainer>

// Footer
<Footer>
  <p>© 2025 My App</p>
</Footer>
```

---

### Grid System

```tsx
import { Grid } from '@/design-system/layout';

// Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
<Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={4}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Fixed 2-column grid
<Grid cols={2} gap={6}>
  <div>Column 1</div>
  <div>Column 2</div>
</Grid>
```

**Props**:
- `cols?`: number | { sm?, md?, lg?, xl?, '2xl'? } (default: 1)
- `gap?`: number (spacing scale, default: 4)
- `children`: ReactNode
- `className?`: string

---

## Theming

### Using ThemeProvider

Already set up in `App.tsx`. No additional configuration needed.

### useTheme Hook

```tsx
import { useTheme } from '@/design-system/hooks';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button onClick={toggleTheme}>
      Current theme: {theme} (Click to toggle)
    </Button>
  );
}
```

**Returns**:
- `theme`: 'light' | 'dark'
- `toggleTheme`: () => void

**Persistence**: Theme preference automatically saved to localStorage.

---

## Accessibility Features

### SkipLink

Allows keyboard users to skip navigation:

```tsx
import { SkipLink } from '@/design-system/accessibility';

<SkipLink /> {/* Defaults to #main-content */}
<SkipLink target="#custom-target" text="Skip to custom section" />
```

### Focus Indicators

Automatically applied to all interactive elements via global CSS. No additional work needed.

### Keyboard Navigation

All components support keyboard interaction:
- **Tab**: Move between elements
- **Enter/Space**: Activate buttons/links
- **Escape**: Close modals (when implemented)

---

## Responsive Design

### Breakpoints

```typescript
sm: 640px   // Small tablets (portrait)
md: 768px   // Tablets (landscape) - navigation condenses here
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1440px // Large desktops
```

### Responsive Utilities

```tsx
// Responsive padding
<div className="px-4 md:px-8 lg:px-12">
  Increases padding at larger screens
</div>

// Responsive grid
<Grid cols={{ sm: 1, md: 2, lg: 3 }}>
  {/* Stacks on mobile, 2 cols on tablet, 3 cols on desktop */}
</Grid>

// Responsive text size
<p className="text-sm md:text-base lg:text-lg">
  Larger text on bigger screens
</p>

// Hide on mobile, show on desktop
<div className="hidden md:block">
  Desktop-only content
</div>
```

---

## Common Patterns

### Form with Validation

```tsx
import { Input, Button, Card, Heading } from '@/design-system/components';
import { useState } from 'react';

function MyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form...
  };

  return (
    <Card>
      <Heading level={2}>Contact Form</Heading>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </Card>
  );
}
```

### Card Grid with Links

```tsx
import { Card, Heading, Link, Grid } from '@/design-system/components';

function TeacherList({ teachers }) {
  return (
    <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={4}>
      {teachers.map(teacher => (
        <Card key={teacher.id}>
          <Heading level={3}>{teacher.name}</Heading>
          <div className="flex gap-2 mt-4">
            <Link href={`/teachers/${teacher.id}/edit`}>Edit</Link>
            <Button variant="tertiary" size="small" onClick={() => handleDelete(teacher.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </Grid>
  );
}
```

### Responsive Navigation

```tsx
import { Header, NavContainer } from '@/design-system/layout';
import { Link } from '@/design-system/components';
import { NavResponsive } from '@/design-system/layout';

function Navigation() {
  return (
    <Header>
      <NavResponsive>
        <Link href="/">Home</Link>
        <Link href="/teachers">Teachers</Link>
        <Link href="/about">About</Link>
      </NavResponsive>
    </Header>
  );
}
```

---

## Best Practices

### DO ✅

- Use design tokens via Tailwind classes whenever possible
- Always provide labels for Input components
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Use semantic HTML (Header, NavContainer, MainContainer, Footer)
- Test keyboard navigation for all interactive elements
- Use Button component for all clickable actions (not divs with onClick)

### DON'T ❌

- Hardcode colors, spacing, or typography (use tokens)
- Create inputs without labels (accessibility violation)
- Skip heading levels (h1 → h3)
- Use inline styles (breaks theming)
- Use divs as buttons (use Button component)
- Override focus styles (breaks keyboard accessibility)

---

## Troubleshooting

### Theme not persisting

**Issue**: Theme resets to light on page reload  
**Solution**: Ensure ThemeProvider is wrapping your app in App.tsx

### Focus ring not showing

**Issue**: No visible focus on keyboard Tab  
**Solution**: Check that `focus-ring.css` is imported in `index.css`

### Contrast issues

**Issue**: Text hard to read on certain backgrounds  
**Solution**: Use contrast-tested combinations:
- Primary text: `text-text-primary` on `bg-background`
- Primary button: `bg-primary-500 text-white`
- Secondary button: `bg-secondary-500 text-white`

### Responsive layout breaking

**Issue**: Content overflows at certain screen sizes  
**Solution**: Use responsive utilities and test at md breakpoint (768px)

---

## Testing Your Components

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/design-system/components';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
});
```

### Accessibility Tests

```typescript
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Input } from '@/design-system/components';

test('has no accessibility violations', async () => {
  const { container } = render(
    <Input id="test" label="Test Input" value="" onChange={() => {}} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Getting Help

### Documentation

- **Architecture Decisions**: See `specs/002-layout-design-system/architecture.md`
- **Design Tokens**: See `specs/002-layout-design-system/research.md`
- **Manual Testing**: See `specs/002-layout-design-system/manual-testing.md`

### Code Examples

Check existing implementations:
- `src/features/teacher/ui/teacher-create-form.tsx` - Form with validation
- `src/features/teacher/ui/teacher-list.tsx` - Card grid with actions
- `src/App.tsx` - Layout and theming setup

### Running Tests

```bash
# All tests
npm test

# Specific test file
npm test -- button.test.tsx

# With coverage
npm test -- --coverage
```

---

## Changelog

| Date       | Version | Changes                  |
| ---------- | ------- | ------------------------ |
| 2025-11-17 | 1.0     | Initial quickstart guide |
