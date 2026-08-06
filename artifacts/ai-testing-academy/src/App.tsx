import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { LocaleProvider } from "./context/LocaleContext";
import { ProviderContextProvider } from "./context/ProviderContext";
import { ProgressProvider } from "./context/ProgressContext";
import { HomePage } from "./pages/HomePage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LocaleProvider>
          <ProgressProvider>
            <ProviderContextProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
            </ProviderContextProvider>
          </ProgressProvider>
        </LocaleProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
