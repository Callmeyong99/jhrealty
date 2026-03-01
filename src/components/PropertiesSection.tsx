import { motion } from "framer-motion";
import { Bath, BedDouble, Maximize } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { properties } from "@/data/properties";

const PropertiesSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section id="properties" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">{t("properties.subtitle")}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t("properties.title1")}<span className="text-gradient-gold italic">{t("properties.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <div className="relative overflow-hidden rounded-lg mb-5">
                <img
                  src={property.image}
                  alt={t(`propertyData.${property.id}.title`)}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground font-body font-semibold text-sm px-4 py-1.5 rounded">
                  {property.price}
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-1">{t(`propertyData.${property.id}.title`)}</h3>
              <p className="text-muted-foreground font-body text-sm mb-4">{t(`propertyData.${property.id}.location`)}</p>
              <div className="flex gap-5 text-muted-foreground font-body text-sm border-t border-border pt-4">
                <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {property.beds} {t("properties.beds")}</span>
                <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {property.baths} {t("properties.baths")}</span>
                <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> {property.area}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
