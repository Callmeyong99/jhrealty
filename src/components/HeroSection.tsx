import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/LanguageToggle";
import heroImg from "@/assets/hero-property.jpg";

const HeroSection = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "500+", label: t("hero.stats.deals") },
    { value: "98%", label: t("hero.stats.satisfaction") },
    { value: t("hero.stats.experienceValue"), label: t("hero.stats.experience") },
    { value: t("hero.stats.coverageValue"), label: t("hero.stats.coverage") },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Luxury property exterior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
      </div>

      <nav className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl md:text-3xl font-bold text-primary-foreground tracking-wide"
        >
          {t("brand.name1")}<span className="text-gradient-gold">{t("brand.suffix")}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center gap-8 text-primary-foreground/80 font-body text-sm tracking-wide"
        >
          <a href="#properties" className="hover:text-gold transition-colors">{t("nav.properties")}</a>
          <a href="#services" className="hover:text-gold transition-colors">{t("nav.services")}</a>
          <a href="#contact" className="hover:text-gold transition-colors">{t("nav.contact")}</a>
          <LanguageToggle />
        </motion.div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gold font-body text-sm md:text-base tracking-[0.25em] uppercase mb-4"
          >
            {t("hero.tagline")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            {t("hero.title1")}
            <br />
            <span className="text-gradient-gold italic">{t("hero.title2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-primary-foreground/70 font-body text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
          >
            {t("hero.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="gold" size="lg" asChild>
              <a href="#contact">
                <Phone className="w-4 h-4 mr-2" />
                {t("hero.cta1")}
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#properties">
                <MapPin className="w-4 h-4 mr-2" />
                {t("hero.cta2")}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-primary/60 backdrop-blur-md border-t border-primary-foreground/10"
      >
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-wrap justify-center md:justify-between gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-gold">{stat.value}</div>
              <div className="text-primary-foreground/60 text-sm font-body mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
