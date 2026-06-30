import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";

// Lazy load all pages except Index (homepage)
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const DataProcessing = lazy(() => import("./pages/DataProcessing"));
const Proiecte = lazy(() => import("./pages/Proiecte"));
const DespreNoi = lazy(() => import("./pages/DespreNoi"));
const ImplicaTe = lazy(() => import("./pages/ImplicaTe"));
const SkillSociale = lazy(() => import("./pages/programs/SkillSociale"));
const EducatieFinanciara = lazy(() => import("./pages/programs/EducatieFinanciara"));
const Leadership = lazy(() => import("./pages/programs/Leadership"));
const LucruInEchipa = lazy(() => import("./pages/programs/LucruInEchipa"));
const ErasmusProjects = lazy(() => import("./pages/erasmus/ErasmusProjects"));
const ErasmusProjectDetail = lazy(() => import("./pages/erasmus/ErasmusProjectDetail"));
const ErasmusGallery = lazy(() => import("./pages/erasmus/ErasmusGallery"));
const ErasmusDissemination = lazy(() => import("./pages/erasmus/ErasmusDissemination"));
const Workshop = lazy(() => import("./pages/Workshop"));
const WorkshopsKids = lazy(() => import("./pages/workshops/WorkshopsKids"));
const WorkshopsYoung = lazy(() => import("./pages/workshops/WorkshopsYoung"));
const WorkshopsAdults = lazy(() => import("./pages/workshops/WorkshopsAdults"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Donate = lazy(() => import("./pages/Donate"));
const Donations = lazy(() => import("./pages/Donations"));
const Partner = lazy(() => import("./pages/Partner"));
const Evenimente = lazy(() => import("./pages/Evenimente"));
const ChildProtectionPolicy = lazy(() => import("./pages/ChildProtectionPolicy"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
        <span className="text-sm font-medium text-primary">Încarcă...</span>
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/proiecte" element={<Suspense fallback={<PageLoader />}><Proiecte /></Suspense>} />
            <Route path="/despre-noi" element={<Suspense fallback={<PageLoader />}><DespreNoi /></Suspense>} />
            <Route path="/implica-te" element={<Suspense fallback={<PageLoader />}><ImplicaTe /></Suspense>} />
            <Route path="/programe/skill-uri-sociale" element={<Suspense fallback={<PageLoader />}><SkillSociale /></Suspense>} />
            <Route path="/programe/educatie-financiara" element={<Suspense fallback={<PageLoader />}><EducatieFinanciara /></Suspense>} />
            <Route path="/programe/leadership" element={<Suspense fallback={<PageLoader />}><Leadership /></Suspense>} />
            <Route path="/programe/lucru-in-echipa" element={<Suspense fallback={<PageLoader />}><LucruInEchipa /></Suspense>} />
            <Route path="/erasmus" element={<Suspense fallback={<PageLoader />}><ErasmusProjects /></Suspense>} />
            <Route path="/erasmus/:projectId" element={<Suspense fallback={<PageLoader />}><ErasmusProjectDetail /></Suspense>} />
            <Route path="/erasmus/:projectId/galerie" element={<Suspense fallback={<PageLoader />}><ErasmusGallery /></Suspense>} />
            <Route path="/erasmus/:projectId/diseminare" element={<Suspense fallback={<PageLoader />}><ErasmusDissemination /></Suspense>} />
            <Route path="/workshop-uri" element={<Suspense fallback={<PageLoader />}><Workshop /></Suspense>} />
            <Route path="/workshop-uri/copii" element={<Suspense fallback={<PageLoader />}><WorkshopsKids /></Suspense>} />
            <Route path="/workshop-uri/tineri" element={<Suspense fallback={<PageLoader />}><WorkshopsYoung /></Suspense>} />
            <Route path="/workshop-uri/adulti" element={<Suspense fallback={<PageLoader />}><WorkshopsAdults /></Suspense>} />
            <Route path="/volunteer" element={<Suspense fallback={<PageLoader />}><Volunteer /></Suspense>} />
            <Route path="/donate" element={<Suspense fallback={<PageLoader />}><Donate /></Suspense>} />
            <Route path="/donari" element={<Suspense fallback={<PageLoader />}><Donations /></Suspense>} />
            <Route path="/partner" element={<Suspense fallback={<PageLoader />}><Partner /></Suspense>} />
            <Route path="/evenimente" element={<Suspense fallback={<PageLoader />}><Evenimente /></Suspense>} />
            <Route path="/politica-de-confidentialitate" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
            <Route path="/termeni-si-conditii" element={<Suspense fallback={<PageLoader />}><TermsAndConditions /></Suspense>} />
            <Route path="/prelucrarea-datelor-personale" element={<Suspense fallback={<PageLoader />}><DataProcessing /></Suspense>} />
            <Route path="/politica-protectia-copilului" element={<Suspense fallback={<PageLoader />}><ChildProtectionPolicy /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
