import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email('Email invalid'),
  subject: z.string().min(3, 'Subiectul trebuie să aibă cel puțin 3 caractere').max(100, 'Subiectul nu poate depăși 100 caractere'),
  message: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere').max(2000, 'Mesajul nu poate depăși 2000 caractere'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@socialskills.ro",
    href: "mailto:contact@socialskills.ro",
    colorClass: "bg-brand-blue/10 text-brand-blue"
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+40757093293",
    href: "tel:+40757093293",
    colorClass: "bg-brand-green/10 text-brand-green"
  },
  {
    icon: MapPin,
    label: "Adresă",
    value: "Calea București 8, Craiova 200580",
    href: "https://www.google.com/maps/search/?api=1&query=Today+Social+Skills+Craiova+Calea+Bucuresti+8",
    colorClass: "bg-brand-orange/10 text-brand-orange"
  },
];

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61550774111898", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/todaysocialskills/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/today-social-skills/", label: "LinkedIn" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@today.social.skills", label: "TikTok" },
];

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // Load reCAPTCHA script when component mounts
  useEffect(() => {
    if (window.grecaptcha) {
      return; // Already loaded
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6LdZF3EsAAAAAIFV3shIZW7sYZYnkcaTIr1oM5kA';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const handleSubmit = async (data: ContactFormData) => {
    let recaptchaToken = '';

    // Try to get reCAPTCHA token
    if (window.grecaptcha) {
      try {
        recaptchaToken = await window.grecaptcha.execute('6LdZF3EsAAAAAIFV3shIZW7sYZYnkcaTIr1oM5kA', {
          action: 'submit',
        });
      } catch (error) {
        console.warn('Failed to get reCAPTCHA token:', error);
      }
    } else {
      console.warn('reCAPTCHA not loaded, proceeding without token');
    }

    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      });

      const responseText = await response.text();
      let result;

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('Failed to parse API response:', responseText);
        console.error('Response status:', response.status);

        // In development, if no response, show helpful message
        if (!responseText) {
          toast({
            variant: "destructive",
            description: 'API nu este disponibil. Formularul va funcționa după deploy pe Vercel.',
          });
          return;
        }

        toast({
          variant: "destructive",
          description: 'Eroare la procesarea răspunsului serverului.',
        });
        return;
      }

      if (response.ok) {
        toast({
          description: result.message || 'Mesajul a fost trimis cu succes!',
        });
        reset();
      } else {
        toast({
          variant: "destructive",
          description: result.error || 'Eroare la trimiterea mesajului.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        description: 'Eroare de conexiune. Asigurați-vă că sunteți online.',
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-brand-indigo/10 text-brand-indigo text-sm font-medium mb-4"
            >
              Contactează-ne
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Hai să <span className="text-brand-indigo">discutăm</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Ai curiozități despre noi? Vrei să colaborăm? Ne-ar plăcea să ne scrii.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <a
                    href={item.href}
                    target={item.label === "Adresă" ? "_blank" : undefined}
                    rel={item.label === "Adresă" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-6 rounded-3xl bg-card border-2 border-border/50 hover:border-brand-indigo/50 shadow-card hover:shadow-card-hover hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl ${item.colorClass} flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium text-foreground group-hover:text-brand-indigo transition-colors truncate">{item.value}</div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-sm text-muted-foreground mb-4">Urmărește-ne</div>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-brand-blue hover:border-brand-blue transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2854.5586107795702!2d23.802730399999994!3d44.3190238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7188e903fadbfb1%3A0xc81cf0d0d5d0bd36!2sToday%20Social%20Skills!5e0!3m2!1sro!2sro!4v1764428541909!5m2!1sro!2sro"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Today Social Skills Location"
              />
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-3xl p-8 shadow-card"
          >
            <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nume
                  </label>
                  <Input
                    id="name"
                    placeholder="Numele tău"
                    className="rounded-xl h-12"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="popescu@exemplu.com"
                    className="rounded-xl h-12"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subiect
                </label>
                <Input
                  id="subject"
                  placeholder="Curiozitatea ta"
                  className="rounded-xl h-12"
                  {...register('subject')}
                />
                {errors.subject && (
                  <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mesaj
                </label>
                <Textarea
                  id="message"
                  placeholder="Spune-ne mai multe despre ceea ce te intereseză..."
                  rows={5}
                  className="rounded-xl resize-none"
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Se trimite...
                  </>
                ) : (
                  <>
                    Trimite Mesaj
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
