import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { assertA11y } from '../../../src/test/a11y/assertA11y';
import { Button } from '../../../src/design-system/components/button';
import { Input } from '../../../src/design-system/components/input';
import { Heading } from '../../../src/design-system/components/heading';
import { Link } from '../../../src/design-system/components/link';
import { Card } from '../../../src/design-system/components/card';
import { SkipLink } from '../../../src/design-system/accessibility/skip-link';
import { Header } from '../../../src/design-system/layout/header';
import { NavContainer } from '../../../src/design-system/layout/nav-container';
import { MainContainer } from '../../../src/design-system/layout/main-container';
import { Footer } from '../../../src/design-system/layout/footer';
import { AppLayout } from '../../../src/design-system/layout/app-layout';

/**
 * Global Axe Accessibility Sweep
 *
 * Comprehensive automated accessibility testing for all design system components
 * Ensures WCAG 2.1 AA compliance across the entire component library
 *
 * Tests cover:
 * - Core UI components (Button, Input, Heading, Link, Card)
 * - Layout components (Header, NavContainer, MainContainer, Footer, AppLayout)
 * - Accessibility components (SkipLink)
 * - Component variants and states
 * - Interactive elements and keyboard navigation
 * - Semantic HTML and ARIA attributes
 */

describe('Design System - Global Accessibility Sweep', () => {
  describe('Core UI Components', () => {
    describe('Button Component', () => {
      it('has no violations in default state', async () => {
        const { container } = render(<Button>Click Me</Button>);
        await assertA11y(container);
      });

      it('has no violations in primary variant', async () => {
        const { container } = render(
          <Button variant="primary">Primary Button</Button>
        );
        await assertA11y(container);
      });

      it('has no violations in secondary variant', async () => {
        const { container } = render(
          <Button variant="secondary">Secondary Button</Button>
        );
        await assertA11y(container);
      });

      it('has no violations in tertiary variant', async () => {
        const { container } = render(
          <Button variant="tertiary">Tertiary Button</Button>
        );
        await assertA11y(container);
      });

      it('has no violations when disabled', async () => {
        const { container } = render(<Button disabled>Disabled Button</Button>);
        await assertA11y(container);
      });

      it('has no violations as submit button', async () => {
        const { container } = render(
          <form>
            <Button type="submit">Submit</Button>
          </form>
        );
        await assertA11y(container);
      });

      it('has no violations with aria-label', async () => {
        const { container } = render(
          <Button aria-label="Close dialog">×</Button>
        );
        await assertA11y(container);
      });
    });

    describe('Input Component', () => {
      it('has no violations with label', async () => {
        const { container } = render(
          <Input label="Full Name" id="name" type="text" />
        );
        await assertA11y(container);
      });

      it('has no violations with label and value', async () => {
        const { container } = render(
          <Input
            label="Email"
            id="email"
            type="email"
            value="test@example.com"
            readOnly
          />
        );
        await assertA11y(container);
      });

      it('has no violations with error state', async () => {
        const { container } = render(
          <Input
            label="Username"
            id="username"
            type="text"
            error="Username is required"
          />
        );
        await assertA11y(container);
      });

      it('has no violations with helper text', async () => {
        const { container } = render(
          <Input
            label="Password"
            id="password"
            type="password"
            helperText="Must be at least 8 characters"
          />
        );
        await assertA11y(container);
      });

      it('has no violations when disabled', async () => {
        const { container } = render(
          <Input label="Locked Field" id="locked" type="text" disabled />
        );
        await assertA11y(container);
      });

      it('has no violations when required', async () => {
        const { container } = render(
          <Input
            label="Required Field"
            id="required"
            type="text"
            required
            aria-required="true"
          />
        );
        await assertA11y(container);
      });

      it('has no violations with placeholder', async () => {
        const { container } = render(
          <Input
            label="Search"
            id="search"
            type="text"
            placeholder="Enter search term"
          />
        );
        await assertA11y(container);
      });
    });

    describe('Heading Component', () => {
      it('has no violations for h1', async () => {
        const { container } = render(<Heading level={1}>Main Title</Heading>);
        await assertA11y(container);
      });

      it('has no violations for h2', async () => {
        const { container } = render(
          <Heading level={2}>Section Title</Heading>
        );
        await assertA11y(container);
      });

      it('has no violations for h3', async () => {
        const { container } = render(
          <Heading level={3}>Subsection Title</Heading>
        );
        await assertA11y(container);
      });

      it('has no violations for h4', async () => {
        const { container } = render(
          <Heading level={4}>Minor Heading</Heading>
        );
        await assertA11y(container);
      });

      it('has no violations for h5', async () => {
        const { container } = render(
          <Heading level={5}>Small Heading</Heading>
        );
        await assertA11y(container);
      });

      it('has no violations for h6', async () => {
        const { container } = render(<Heading level={6}>Tiny Heading</Heading>);
        await assertA11y(container);
      });

      it('has no violations in proper hierarchy', async () => {
        const { container } = render(
          <div>
            <Heading level={1}>Page Title</Heading>
            <Heading level={2}>Section</Heading>
            <Heading level={3}>Subsection</Heading>
          </div>
        );
        await assertA11y(container);
      });
    });

    describe('Link Component', () => {
      it('has no violations with href', async () => {
        const { container } = render(<Link href="/about">About Us</Link>);
        await assertA11y(container);
      });

      it('has no violations as external link', async () => {
        const { container } = render(
          <Link
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            External Link
          </Link>
        );
        await assertA11y(container);
      });

      it('has no violations with aria-label', async () => {
        const { container } = render(
          <Link href="/profile" aria-label="View your profile">
            Profile
          </Link>
        );
        await assertA11y(container);
      });

      it('has no violations in navigation list', async () => {
        const { container } = render(
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        );
        await assertA11y(container);
      });
    });

    describe('Card Component', () => {
      it('has no violations with basic content', async () => {
        const { container } = render(
          <Card>
            <p>Card content</p>
          </Card>
        );
        await assertA11y(container);
      });

      it('has no violations with heading and content', async () => {
        const { container } = render(
          <Card>
            <Heading level={2}>Card Title</Heading>
            <p>Card description text</p>
          </Card>
        );
        await assertA11y(container);
      });

      it('has no violations with interactive content', async () => {
        const { container } = render(
          <Card>
            <Heading level={3}>Action Card</Heading>
            <p>Description</p>
            <Button>Take Action</Button>
          </Card>
        );
        await assertA11y(container);
      });

      it('has no violations in grid layout', async () => {
        const { container } = render(
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}
          >
            <Card>
              <Heading level={3}>Card 1</Heading>
            </Card>
            <Card>
              <Heading level={3}>Card 2</Heading>
            </Card>
          </div>
        );
        await assertA11y(container);
      });
    });
  });

  describe('Layout Components', () => {
    describe('Header Component', () => {
      it('has no violations with simple content', async () => {
        const { container } = render(
          <Header>
            <Heading level={1}>Site Title</Heading>
          </Header>
        );
        await assertA11y(container);
      });

      it('has no violations with navigation', async () => {
        const { container } = render(
          <Header>
            <Heading level={1}>Site</Heading>
            <nav>
              <Link href="/">Home</Link>
            </nav>
          </Header>
        );
        await assertA11y(container);
      });
    });

    describe('NavContainer Component', () => {
      it('has no violations with navigation links', async () => {
        const { container } = render(
          <NavContainer>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </NavContainer>
        );
        await assertA11y(container);
      });

      it('has no violations with aria-label', async () => {
        const { container } = render(
          <NavContainer aria-label="Main navigation">
            <Link href="/">Home</Link>
          </NavContainer>
        );
        await assertA11y(container);
      });
    });

    describe('MainContainer Component', () => {
      it('has no violations with content', async () => {
        const { container } = render(
          <MainContainer>
            <Heading level={1}>Page Title</Heading>
            <p>Page content</p>
          </MainContainer>
        );
        await assertA11y(container);
      });

      it('has no violations with sections', async () => {
        const { container } = render(
          <MainContainer>
            <section>
              <Heading level={2}>Section 1</Heading>
              <p>Content</p>
            </section>
            <section>
              <Heading level={2}>Section 2</Heading>
              <p>Content</p>
            </section>
          </MainContainer>
        );
        await assertA11y(container);
      });
    });

    describe('Footer Component', () => {
      it('has no violations with basic content', async () => {
        const { container } = render(
          <Footer>
            <p>&copy; 2025 Company Name</p>
          </Footer>
        );
        await assertA11y(container);
      });

      it('has no violations with links', async () => {
        const { container } = render(
          <Footer>
            <nav aria-label="Footer navigation">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </Footer>
        );
        await assertA11y(container);
      });
    });

    describe('AppLayout Component', () => {
      it('has no violations with all sections', async () => {
        const { container } = render(
          <AppLayout
            header={
              <div>
                <Heading level={1}>Site Title</Heading>
              </div>
            }
            navigation={
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
              </ul>
            }
            footer={<p>&copy; 2025</p>}
          >
            <Heading level={2}>Page Content</Heading>
            <p>Main content area</p>
          </AppLayout>
        );
        await assertA11y(container);
      });

      it('has no violations with minimal layout', async () => {
        const { container } = render(
          <AppLayout>
            <div>Content only</div>
          </AppLayout>
        );
        await assertA11y(container);
      });
    });
  });

  describe('Accessibility Components', () => {
    describe('SkipLink Component', () => {
      it('has no violations with default props', async () => {
        const { container } = render(
          <div>
            <SkipLink />
            <main id="main-content">
              <h1>Content</h1>
            </main>
          </div>
        );
        await assertA11y(container);
      });

      it('has no violations with custom target', async () => {
        const { container } = render(
          <div>
            <SkipLink targetId="custom-main">Skip to custom</SkipLink>
            <div id="custom-main">
              <h1>Custom Main</h1>
            </div>
          </div>
        );
        await assertA11y(container);
      });
    });
  });

  describe('Component Combinations', () => {
    it('has no violations with form using multiple components', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Registration Form</Heading>
          <form>
            <Input label="Name" id="name" type="text" required />
            <Input label="Email" id="email" type="email" required />
            <Input
              label="Password"
              id="password"
              type="password"
              helperText="At least 8 characters"
              required
            />
            <Button type="submit">Register</Button>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </form>
        </div>
      );
      await assertA11y(container);
    });

    it('has no violations with card grid containing forms', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Dashboard</Heading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}
          >
            <Card>
              <Heading level={2}>Card 1</Heading>
              <Input label="Field" id="field1" type="text" />
              <Button>Submit</Button>
            </Card>
            <Card>
              <Heading level={2}>Card 2</Heading>
              <p>Content</p>
              <Link href="/more">Learn More</Link>
            </Card>
          </div>
        </div>
      );
      await assertA11y(container);
    });

    it('has no violations with complete page structure', async () => {
      const { container } = render(
        <AppLayout
          header={
            <div>
              <Heading level={1}>Application</Heading>
            </div>
          }
          navigation={
            <nav aria-label="Main navigation">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/features">Features</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
              </ul>
            </nav>
          }
          footer={
            <div>
              <p>&copy; 2025 Company</p>
              <nav aria-label="Footer links">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
              </nav>
            </div>
          }
        >
          <SkipLink />
          <Heading level={2}>Welcome</Heading>
          <Card>
            <Heading level={3}>Get Started</Heading>
            <p>Start using our application today.</p>
            <Button variant="primary">Sign Up</Button>
          </Card>
        </AppLayout>
      );
      await assertA11y(container);
    });
  });

  describe('Interactive States', () => {
    it('has no violations with form in error state', async () => {
      const { container } = render(
        <form>
          <Input
            label="Email"
            id="email"
            type="email"
            error="Please enter a valid email address"
            value="invalid-email"
            readOnly
          />
          <Button type="submit" disabled>
            Submit
          </Button>
        </form>
      );
      await assertA11y(container);
    });

    it('has no violations with disabled buttons', async () => {
      const { container } = render(
        <div>
          <Button variant="primary" disabled>
            Primary Disabled
          </Button>
          <Button variant="secondary" disabled>
            Secondary Disabled
          </Button>
          <Button variant="tertiary" disabled>
            Tertiary Disabled
          </Button>
        </div>
      );
      await assertA11y(container);
    });

    it('has no violations with mixed interactive and static content', async () => {
      const { container } = render(
        <Card>
          <Heading level={2}>User Profile</Heading>
          <p>Name: John Doe</p>
          <p>Email: john@example.com</p>
          <div>
            <Button variant="primary">Edit Profile</Button>
            <Button variant="secondary">Change Password</Button>
            <Link href="/logout">Logout</Link>
          </div>
        </Card>
      );
      await assertA11y(container);
    });
  });
});
