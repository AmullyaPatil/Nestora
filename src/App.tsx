import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./contexts/WishlistContext";
import Index from "./pages/Index";
import AllProperties from "./pages/AllProperties";
import AllLocalities from "./pages/AllLocalities";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <WishlistProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/Nestora">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<AllProperties />} />
            <Route path="/localities" element={<AllLocalities />} />
            <Route path="/wishlist" element={<Wishlist />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
