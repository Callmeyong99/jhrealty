import { motion } from "framer-motion";
import { Home, TrendingUp, FileText, Handshake } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Home, TrendingUp, FileText, Handshake];

const ServicesSection = () => {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">{t("services.subtitle")}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t("services.title1")}<span className="text-gradient-gold italic">{t("services.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-lg p-8 text-center group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
