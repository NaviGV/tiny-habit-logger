
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  
    <TooltipProvider>
      
      <Sonner position="top-center" toastOptions={{
          classNames: {
            toast: 'border-border',
            success: 'bg-green-100 text-green-800 border-green-300',
            error: 'bg-red-100 text-red-800 border-red-300',
          },
        }}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
 
);

export default App;
