import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Bath, BedDouble, Maximize, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { properties } from "@/data/properties";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const extractPrice = (priceStr: string): number => {
  const match = priceStr.replace(/,/g, "").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const PropertiesSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const locations = useMemo(
    () => [...new Set(properties.map((p) => p.id))],
    []
  );

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const title = t(`propertyData.${property.id}.title`) as string;
      const location = t(`propertyData.${property.id}.location`) as string;

      // Text search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query);

      // Location filter
      const matchesLocation =
        locationFilter === "all" || property.id === locationFilter;

      // Price filter
      const price = extractPrice(property.price);
      let matchesPrice = true;
      if (priceFilter === "under500") matchesPrice = price < 500;
      else if (priceFilter === "500to800") matchesPrice = price >= 500 && price <= 800;
      else if (priceFilter === "800to1200") matchesPrice = price >= 800 && price <= 1200;
      else if (priceFilter === "above1200") matchesPrice = price > 1200;

      return matchesSearch && matchesLocation && matchesPrice;
    });
  }, [searchQuery, locationFilter, priceFilter, t]);

  const hasFilters = searchQuery || locationFilter !== "all" || priceFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("all");
    setPriceFilter("all");
  };

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

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-col md:flex-row gap-4 items-stretch"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("properties.searchPlaceholder")}
              className="pl-10 h-12 bg-card border-border font-body"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="h-12 w-full md:w-48 bg-card border-border font-body">
              <SelectValue placeholder={t("properties.allLocations")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("properties.allLocations")}</SelectItem>
              {locations.map((id) => (
                <SelectItem key={id} value={id}>
                  {t(`propertyData.${id}.location`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="h-12 w-full md:w-48 bg-card border-border font-body">
              <SelectValue placeholder={t("properties.allPrices")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("properties.allPrices")}</SelectItem>
              <SelectItem value="under500">{t("properties.priceUnder500")}</SelectItem>
              <SelectItem value="500to800">{t("properties.price500to800")}</SelectItem>
              <SelectItem value="800to1200">{t("properties.price800to1200")}</SelectItem>
              <SelectItem value="above1200">{t("properties.priceAbove1200")}</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Results */}
        {filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProperties.map((property, i) => (
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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground font-body text-lg mb-4">{t("properties.noResults")}</p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-accent hover:text-accent/80 font-body font-medium underline underline-offset-4 transition-colors"
              >
                {t("properties.clearFilters")}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;
