import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Cybersecurity from "./pages/Cybersecurity";
import SoftwareDevelopment from "./pages/SoftwareDevelopment";
import Labs from "./pages/Labs";
import Projects from "./pages/Projects";
import ElectricalElectronics from "./pages/ElectricalElectronics";
import Experience from "./pages/Experience";
import Journal from "./pages/Journal";
import CV from "./pages/CV";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cybersecurity" element={<Cybersecurity />} />
            <Route path="/software-development" element={<SoftwareDevelopment />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/electrical-electronics" element={<ElectricalElectronics />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
