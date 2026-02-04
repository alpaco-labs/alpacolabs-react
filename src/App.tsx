// App root component
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { InquiryModalProvider } from "@/contexts/InquiryModalContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsentBanner from "./components/CookieConsentBanner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Force dark mode only
const DarkModeEnforcer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeEnforcer>
      <CookieConsentProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <InquiryModalProvider>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CookieConsentBanner />
              </InquiryModalProvider>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </CookieConsentProvider>
    </DarkModeEnforcer>
  </QueryClientProvider>
);

export default App;
