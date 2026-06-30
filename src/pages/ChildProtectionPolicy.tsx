import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChildProtectionPolicy() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const handleLanguageSelect = (language: "ro" | "en") => {
    const urls = {
      ro: "https://docs.google.com/document/d/1Nm-oF3s6cZYSG5Ym-SKosH4RH0BAlwCw/export?format=docx",
      en: "https://docs.google.com/document/d/1jCCHaf4RTp4wY8DfrNDRjVedRO0Sgx3G/export?format=docx",
    };

    window.location.href = urls[language];
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-12 bg-gradient-to-br from-brand-blue/10 via-background to-brand-indigo/5 overflow-hidden"
      >
        <div className="container relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi acasă
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Politica de Protecția Copilului
            </h1>
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-indigo/10 rounded-full blur-3xl" />
      </section>

      {/* Language Selection */}
      <section className="py-12 bg-background -mt-16">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl shadow-card p-12 border border-border text-center"
          >
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/10 mb-6">
                <Globe className="w-8 h-8 text-brand-blue" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Alege limba
              </h2>
              <p className="text-muted-foreground">
                Selectează limba în care dorești să descarci documentul
              </p>
            </div>

            {/* Language Buttons - Horizontal Aligned */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                onClick={() => handleLanguageSelect("ro")}
                className="px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue/90 transition-colors text-lg"
              >
                Română
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                onClick={() => handleLanguageSelect("en")}
                className="px-8 py-4 bg-brand-indigo text-white font-semibold rounded-lg hover:bg-brand-indigo/90 transition-colors text-lg"
              >
                English
              </motion.button>
            </div>

            {/* Information */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Politica de Protecția Copilului este un document esențial care detaliază angajamentul organizației noastre față de siguranța și bunăstarea tuturor copiilor și tinerilor cu care lucrăm.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
