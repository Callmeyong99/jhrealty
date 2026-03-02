import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Bath, BedDouble, Maximize, Search, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProperties, formatPrice, type ApiProperty } from "@/hooks/useProperties";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const PropertiesSection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: properties = [], isLoading, isError } = useProperties();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const isZh = i18n.language === "zh";

  const getTitle = (p: ApiProperty) => (isZh ? p.title : p.titleEn);
  const getLocation = (p: ApiProperty) => (isZh ? p.location : p.locationEn);

  const locations = useMemo(
    () => [...new Map(properties.map((p) => [p.location, p])).values()],
    [properties]
  );

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const title = getTitle(property);
      const location = getLocation(property);

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query);

      const matchesLocation =
        locationFilter === "all" || property.location === locationFilter;

      const price = property.price;
      let matchesPrice = true;
      if (priceFilter === "under500k") matchesPrice = price < 500000;
      else if (priceFilter === "500kto800k") matchesPrice = price >= 500000 && price <= 800000;
      else if (priceFilter === "800kto1.2m") matchesPrice = price >= 800000 && price <= 1200000;
      else if (priceFilter === "above1.2m") matchesPrice = price > 1200000;

      return matchesSearch && matchesLocation && matchesPrice;
    });
  }, [searchQuery, locationFilter, priceFilter, properties, i18n.language]);

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
              {locations.map((p) => (
                <SelectItem key={p.location} value={p.location}>
                  {getLocation(p)}
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
              <SelectItem value="under500k">{t("properties.priceUnder500k")}</SelectItem>
              <SelectItem value="500kto800k">{t("properties.price500kto800k")}</SelectItem>
              <SelectItem value="800kto1.2m">{t("properties.price800kto1.2m")}</SelectItem>
              <SelectItem value="above1.2m">{t("properties.priceAbove1.2m")}</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-72 rounded-lg" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-full h-10" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body text-lg">{t("properties.loadError")}</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !isError && filteredProperties.length > 0 && (
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
                    alt={getTitle(property)}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground font-body font-semibold text-sm px-4 py-1.5 rounded">
                    {formatPrice(property.price)}
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-1">{getTitle(property)}</h3>
                <p className="text-muted-foreground font-body text-sm mb-4">{getLocation(property)}</p>
                <div className="flex gap-5 text-muted-foreground font-body text-sm border-t border-border pt-4">
                  <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {property.beds} {t("properties.beds")}</span>
                  <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {property.baths} {t("properties.baths")}</span>
                  <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> {property.area} sqft</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && !isError && filteredProperties.length === 0 && (
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
