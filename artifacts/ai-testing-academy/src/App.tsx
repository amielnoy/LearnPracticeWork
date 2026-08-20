import { Switch, Route, Router as WouterRouter } from 'wouter';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ErrorBoundary } from './components/chrome/ErrorBoundary';
import { LocaleProvider } from './context/LocaleContext';
import { ProviderContextProvider } from './context/ProviderContext';
import { ProgressProvider } from './context/ProgressContext';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/privacy">{() => <LegalPage kind="privacy" />}</Route>
      <Route path="/terms">{() => <LegalPage kind="terms" />}</Route>
      <Route path="/accessibility">{() => <LegalPage kind="accessibility" />}</Route>
      <Route path="/cancellation">{() => <LegalPage kind="cancellation" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

// A QueryClientProvider used to sit outermost here. Nothing in the application
// ever called useQuery or useMutation — the import in this file was the only
// reference to @tanstack/react-query anywhere in src — so it was shipping in
// the bundle to wrap components that never asked it anything. The one piece of
// remote state the site has, `loadServerConfig`, is fetched once on mount in
// ProviderContext and does not need a cache.
function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <LocaleProvider>
          <AuthProvider>
            <ProgressProvider>
              <ProviderContextProvider>
                <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                  <Router />
                </WouterRouter>
              </ProviderContextProvider>
            </ProgressProvider>
          </AuthProvider>
        </LocaleProvider>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
