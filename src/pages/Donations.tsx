import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, ArrowLeft, CreditCard, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const donationOptions = [
  {
    id: "card",
    title: "Donație",
    description: "Donează direct folosind cardul de credit sau debit",
    icon: CreditCard,
    color: "brand-blue",
    ctaText: "Donează",
    showToast: true,
  },
  {
    id: "redirect-3.5",
    title: "Donează 3.5%",
    description: "Direcționează 3.5% din impozitul pe venit pentru proiectele noastre",
    icon: TrendingUp,
    color: "brand-green",
    ctaText: "Donează 3.5%",
    link: "https://redirectioneaza.ro/today-social-skills/",
  },
  {
    id: "redirect-20",
    title: "Donează 20%",
    description: "Direcționează 20% din impozitul pe venit pentru proiectele noastre",
    icon: TrendingUp,
    color: "brand-green",
    ctaText: "Donează 20%",
    showToast: true,
  },
];

function DonationCard({
  option,
  index,
}: {
  option: (typeof donationOptions)[0];
  index: number;
}) {
  const { toast } = useToast();
  const Icon = option.icon;
  const colorClass = `${option.color}`;

  const handleClick = () => {
    if ("showToast" in option && option.showToast) {
      toast({
        description: "Această secțiune este în lucru...",
      });
    } else if ("link" in option && option.link) {
      window.location.href = option.link;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 p-8 flex flex-col h-full border border-border hover:border-brand-blue/30">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl bg-${colorClass}/10 flex items-center justify-center mb-6`}>
          <Icon className={`w-8 h-8 text-${colorClass}`} />
        </div>

        {/* Title and Description */}
        <h3 className="text-2xl font-bold text-foreground mb-3">{option.title}</h3>
        <p className="text-muted-foreground mb-8 flex-grow">
          {option.description}
        </p>

        {/* CTA Button */}
        <Button
          onClick={handleClick}
          size="lg"
          className="w-full gap-2"
        >
          <Heart className="w-4 h-4" />
          {option.ctaText}
        </Button>
      </div>
    </motion.div>
  );
}

export default function Donations() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-16 bg-gradient-to-br from-brand-blue/10 via-background to-brand-indigo/5 overflow-hidden"
      >
        <div className="container relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
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
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Susține <span className="text-brand-blue">proiectele noastre</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Alege modalitatea care ți se potrivește cel mai bine pentru a contribui la educația tinerilor și
              dezvoltarea comunității. Fiecare donație face diferență!
            </p>
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-indigo/10 rounded-full blur-3xl" />
      </section>

      {/* Donation Options Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {donationOptions.map((option, index) => (
              <DonationCard key={option.id} option={option} index={index} />
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-brand-blue/5 rounded-2xl p-8 border border-brand-blue/20"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">De ce să donezi?</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-brand-blue font-bold">✓</span>
                <span>
                  Susții educația nonformală și dezvoltarea competențelor tinerilor din România
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-blue font-bold">✓</span>
                <span>
                  Contribui la proiecte Erasmus+ și schimburi internaționale
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-blue font-bold">✓</span>
                <span>
                  Fiecare donație este deductibilă din impozit și poate fi direcționată
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-blue font-bold">✓</span>
                <span>
                  Fii parte din o comunitate care crede în puterea educației
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
