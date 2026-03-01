import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Bath, BedDouble, Maximize, MapPin, Calendar, Car, Compass,
  CheckCircle2, Phone, Building2, Shield, Hash, Clock, Home, Dumbbell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPropertyById } from "@/data/properties";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/LanguageToggle";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = getPropertyById(id || "");
  const { t } = useTranslation();

  // Get translated property content
  const tp = (key: string) => t(`propertyData.${id}.${key}`);
  const tpArray = (key: string): string[] => {
    const val = t(`propertyData.${id}.${key}`, { returnObjects: true }) as unknown;
    return Array.isArray(val) ? (val as string[]) : [];
  };
  const tpUnitTypes = (): Array<{ name: string; furnishing: string }> => {
    const val = t(`propertyData.${id}.unitTypes`, { returnObjects: true }) as unknown;
    return Array.isArray(val) ? (val as Array<{ name: string; furnishing: string }>) : [];
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">{t("detail.notFound")}</h1>
          <Button variant="gold" onClick={() => navigate("/")}>{t("detail.backHome")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="font-display font-semibold text-foreground">{tp("title")}</span>
          </div>
          <LanguageToggle variant="detail" />
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <img src={property.image} alt={tp("title")} className="w-full h-full object-cover" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-10"
          >
            {/* Title & Price */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">{t("detail.startingFrom")}</p>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{property.price}</h1>
                  {property.estRepayment && (
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      {t("detail.estRepayment")} {property.estRepayment}
                    </p>
                  )}
                </div>
                <div className="flex gap-6">
                  {[
                    { icon: BedDouble, value: `${property.beds} ${t("properties.beds")}` },
                    { icon: Bath, value: `${property.baths} ${t("properties.baths")}` },
                    { icon: Maximize, value: property.area },
                  ].map((s) => (
                    <div key={s.value} className="flex flex-col items-center gap-1">
                      <s.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-body text-foreground">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="flex items-center gap-2 text-muted-foreground font-body">
                <MapPin className="w-4 h-4" /> {tp("location")}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.highlights")}</h2>
              <div className="space-y-3">
                {tpArray("highlights").map((h) => (
                  <div key={h} className="flex items-center gap-3 text-muted-foreground font-body">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.about")}</h2>
              <p className="text-muted-foreground font-body leading-relaxed">{tp("description")}</p>
            </div>

            {/* Property Details Grid */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.propertyDetails")}</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Home, label: t("detail.propertyType"), value: tp("propertyType") },
                  { icon: Building2, label: t("detail.developer"), value: tp("developer") },
                  { icon: Shield, label: t("detail.tenure"), value: tp("tenure") },
                  { icon: Calendar, label: t("detail.completionYear"), value: tp("completionYear") },
                  { icon: Hash, label: t("detail.totalUnits"), value: tp("totalUnits") },
                  { icon: Clock, label: t("detail.status"), value: tp("status") },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 font-body text-sm">
                    <item.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unit Types */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.unitTypes")}</h2>
              <div className="space-y-4">
                {property.unitTypes.map((unit, idx) => {
                  const translatedUnits = tpUnitTypes();
                  const tUnit = translatedUnits[idx] || { name: unit.name, furnishing: unit.furnishing };
                  return (
                  <div key={unit.name} className="bg-card border border-border rounded-lg p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <div>
                        <span className="inline-block bg-muted text-muted-foreground text-xs font-body px-3 py-1 rounded-md font-medium">
                          {tUnit.name}
                        </span>
                        <span className="text-xs text-muted-foreground font-body ml-2">{unit.size}</span>
                      </div>
                      <p className="text-lg font-display font-bold text-foreground">{unit.priceRange}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-body">
                      <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {unit.beds} {t("properties.beds")}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {unit.baths} {t("properties.baths")}</span>
                      <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {unit.size}</span>
                      <span>{unit.pricePerSqft}</span>
                      <span>{t("detail.furnishing")}: {tUnit.furnishing}</span>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.facilities")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tpArray("facilities").map((f) => (
                  <div key={f} className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                    <Dumbbell className="w-4 h-4 text-accent flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.features")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tpArray("features").map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <p className="text-3xl font-display font-bold text-accent mb-2">{property.price}</p>
              {property.estRepayment && (
                <p className="text-sm text-muted-foreground font-body mb-6">{t("detail.estRepayment")} {property.estRepayment}</p>
              )}

              <div className="space-y-4 mb-8 text-sm font-body">
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {t("detail.yearBuilt")}</span>
                  <span className="text-foreground font-medium">{tp("yearBuilt")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Car className="w-4 h-4" /> {t("detail.parking")}</span>
                  <span className="text-foreground font-medium">{tp("parking")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Compass className="w-4 h-4" /> {t("detail.orientation")}</span>
                  <span className="text-foreground font-medium">{tp("orientation")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> {t("detail.tenure")}</span>
                  <span className="text-foreground font-medium">{tp("tenure")}</span>
                </div>
              </div>

              <Button variant="gold" className="w-full mb-3" asChild>
                <a
                  href={`https://api.whatsapp.com/send?phone=601110508741&text=${encodeURIComponent(`Hi, I'm interested in【${tp("title")}】and would like to know more.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t("detail.whatsapp")}
                </a>
              </Button>
              <Button variant="hero-outline" className="w-full mb-3" asChild>
                <a href="tel:+601110508741">
                  <Phone className="w-4 h-4 mr-2" />
                  {t("detail.call")}
                </a>
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => navigate("/")}>
                {t("detail.backHome")}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
