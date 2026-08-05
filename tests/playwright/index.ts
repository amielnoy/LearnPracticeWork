/**
 * Mount hook for component tests.
 *
 * Deliberately does not import the academy's stylesheets: the assertions are
 * on text, roles and state, so pulling in Tailwind would add a build
 * dependency without adding coverage.
 */
import '@playwright/experimental-ct-react/hooks';
