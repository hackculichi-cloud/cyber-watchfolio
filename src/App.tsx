import { lazy, Suspense } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import Layout from "@/components/layout/Layout";
import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Cybersecurity = lazy(() => import("./pages/Cybersecurity"));
const SoftwareDevelopment = lazy(() => import("./pages/SoftwareDevelopment"));
const Labs = lazy(() => import("./pages/Labs"));
const Projects = lazy(() => import("./pages/Projects"));
const Electrical = lazy(() => import("./pages/Electrical"));
const Electronics = lazy(() => import("./pages/Electronics"));
const TechnicalRepair = lazy(() => import("./pages/TechnicalRepair"));
const Experience = lazy(() => import("./pages/Experience"));
const Barbering = lazy(() => import("./pages/Barbering"));
const CV = lazy(() => import("./pages/CV"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteLoading = () => {
  const { t } = useLanguage();
  return <p role="status" className="container mx-auto px-4 py-24 text-muted-foreground">{t("Loading page")}</p>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cybersecurity" element={<Cybersecurity />} />
                <Route path="/software-development" element={<SoftwareDevelopment />} />
                <Route path="/labs" element={<Labs />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/electrical-electronics" element={<Electrical />} />
                {/* Profile aliases */}
                <Route path="/development" element={<SoftwareDevelopment />} />
                <Route path="/electrical" element={<Electrical />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/repair" element={<TechnicalRepair />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/barbering" element={<Barbering />} />
                <Route path="/cv" element={<CV />} />
                <Route path="/contact" element={<Contact />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
