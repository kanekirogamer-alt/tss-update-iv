import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Mail, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Evenimente() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Megaphone className="w-12 h-12 text-brand-orange" />
              Evenimente și Recrutare
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              Află mai multe despre oportunități și cum poți participa
            </p>
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-indigo/10 rounded-full blur-3xl" />
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl shadow-card p-8 md:p-12 border border-border"
          >
            {/* Main Message */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Recrutăm pentru Proiectele ERASMUS+
              </h2>

              <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  Suntem în căutare de tineri pasionați care doresc să participe în proiectele noastre internaționale de tip Youth Exchange și Training Courses finanțate de Uniunea Europeană prin programul ERASMUS+.
                </p>

                <div className="bg-brand-blue/5 rounded-xl p-6 border border-brand-blue/20">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="text-brand-blue">✓</span>
                    Ce îți oferim
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-brand-blue font-bold">•</span>
                      <span>Oportunitate de a explora valorile europene și democrația activă</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-brand-blue font-bold">•</span>
                      <span>Schimburi internaționale cu tineri din alte țări europene</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-brand-blue font-bold">•</span>
                      <span>Dezvoltare de competențe esenţiale (leadership, comunicare, lucru în echipă)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-brand-blue font-bold">•</span>
                      <span>Certificare de participare (YouthPass)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-brand-blue font-bold">•</span>
                      <span>Acoperire completă a costurilor (cazare, masă, transport)</span>
                    </li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed">
                  Proiectele noastre reunesc tineri din România, Turcia, Bulgaria, Lituania și alte țări europene pentru activități de educație non-formală de înaltă calitate.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-brand-green/5 rounded-xl p-8 border border-brand-green/20">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-brand-green" />
                Contactează-ne pentru detalii
              </h3>

              <p className="text-muted-foreground mb-8">
                Pentru informații suplimentare, cerințe de participare și deschideri actuale în proiectele ERASMUS+, te rugăm să ne contactezi prin email:
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:contact@todaysocialskills.ro"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-medium rounded-lg hover:bg-brand-green/90 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  contact@todaysocialskills.ro
                </a>

                <Button variant="outline" asChild>
                  <Link to="/implica-te">
                    Alte moduri de implicare
                  </Link>
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Today Social Skills este o organizație care implementează proiecte de mobilitate educațională pentru tineri. Suntem dedicați promovării educației non-formale și dezvoltării competențelor esenţiale pentru cetățenie activă în Europa.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
