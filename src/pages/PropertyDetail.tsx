import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Bath, BedDouble, Maximize, MapPin, Calendar, Car, Compass,
  CheckCircle2, Phone, Building2, Shield, Hash, Clock, Home, Dumbbell, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProperties, formatPrice, type ApiProperty } from "@/hooks/useProperties";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/LanguageToggle";
import { Skeleton } from "@/components/ui/skeleton";
import PropertyGallery from "@/components/PropertyGallery";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: properties = [], isLoading } = useProperties();

  const isZh = i18n.language === "zh";
  const property = properties.find((p) => p.id === id);

  const getField = (p: ApiProperty, zh: keyof ApiProperty, en: keyof ApiProperty) =>
    (isZh ? p[zh] : p[en]) as string;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-6">
          <Skeleton className="w-full h-[50vh] rounded-lg" />
          <Skeleton className="w-1/2 h-10" />
          <Skeleton className="w-3/4 h-6" />
          <Skeleton className="w-full h-40" />
        </div>
      </div>
    );
  }

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

  const title = getField(property, "title", "titleEn");
  const location = getField(property, "location", "locationEn");
  const description = getField(property, "description", "descriptionEn");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="font-display font-semibold text-foreground">{title}</span>
          </div>
          <LanguageToggle variant="detail" />
        </div>
      </div>

      {/* Image Gallery */}
      <PropertyGallery images={property.images} title={title} />

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
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{formatPrice(property.price)}</h1>
                  {property.estRepayment && (
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      {t("detail.estRepayment")} RM {property.estRepayment.toLocaleString()}/mo
                    </p>
                  )}
                </div>
                <div className="flex gap-6">
                  {[
                    { icon: BedDouble, value: `${property.beds} ${t("properties.beds")}` },
                    { icon: Bath, value: `${property.baths} ${t("properties.baths")}` },
                    { icon: Maximize, value: `${property.area} sqft` },
                  ].map((s) => (
                    <div key={s.value} className="flex flex-col items-center gap-1">
                      <s.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-body text-foreground">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="flex items-center gap-2 text-muted-foreground font-body">
                <MapPin className="w-4 h-4" /> {location}
              </p>
            </div>

            {/* Highlights */}
            {property.highlights.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.highlights")}</h2>
                <div className="space-y-3">
                  {property.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 text-muted-foreground font-body">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.about")}</h2>
              <p className="text-muted-foreground font-body leading-relaxed">{description}</p>
            </div>

            {/* Property Details Grid */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.propertyDetails")}</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Home, label: t("detail.propertyType"), value: property.propertyType },
                  { icon: Building2, label: t("detail.developer"), value: property.developer },
                  { icon: Shield, label: t("detail.tenure"), value: property.tenure },
                  { icon: Calendar, label: t("detail.completionYear"), value: String(property.completionYear) },
                  { icon: Hash, label: t("detail.totalUnits"), value: `${property.totalUnits} Units` },
                  { icon: Clock, label: t("detail.status"), value: property.status },
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

            {/* Facilities */}
            {property.facilities.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.facilities")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.facilities.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                      <Dumbbell className="w-4 h-4 text-accent flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">{t("detail.features")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Floor Plan */}
            {property.floorPlan && (
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" />
                  {t("detail.floorPlan")}
                </h2>
                <div className="rounded-lg overflow-hidden border border-border bg-card">
                  <img
                    src={property.floorPlan}
                    alt={`${title} - Floor Plan`}
                    className="w-full object-contain max-h-[500px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Google Map */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                {t("detail.location")}
              </h2>
              <div className="rounded-lg overflow-hidden border border-border bg-card aspect-video">
                <iframe
                  title={`${title} - Location`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={(() => {
                    // Extract coordinates from Google Maps URLs
                    const extractCoords = (url: string): string | null => {
                      if (!url || !url.startsWith("http")) return null;
                      // Skip short links (maps.app.goo.gl) - can't extract coords
                      if (url.includes("goo.gl") || url.includes("cid=")) return null;
                      // Match coordinates like /@1.488,110.404 or /place/1.488,110.404
                      const coordMatch = url.match(/(?:@|place\/)(-?\d+\.?\d*),(-?\d+\.?\d*)/);
                      if (coordMatch) return `${coordMatch[1]},${coordMatch[2]}`;
                      // Match ?q= parameter
                      try {
                        const q = new URL(url).searchParams.get("q");
                        if (q) return q;
                      } catch {}
                      // Match /place/Name pattern
                      const placeMatch = url.match(/\/place\/([^/@]+)/);
                      if (placeMatch) return decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
                      return null;
                    };
                    const fromUrl = extractCoords(property.location) || extractCoords(property.locationEn);
                    const textAddr = [property.location, property.locationEn]
                      .filter(a => a && !a.startsWith("http"))
                      .sort((a, b) => b.length - a.length)[0];
                    const mapQuery = fromUrl || textAddr || location;
                    return `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
                  })()}
                  allowFullScreen
                />
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
              <p className="text-3xl font-display font-bold text-accent mb-2">{formatPrice(property.price)}</p>
              {property.estRepayment && (
                <p className="text-sm text-muted-foreground font-body mb-6">{t("detail.estRepayment")} RM {property.estRepayment.toLocaleString()}/mo</p>
              )}

              <div className="space-y-4 mb-8 text-sm font-body">
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {t("detail.yearBuilt")}</span>
                  <span className="text-foreground font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Car className="w-4 h-4" /> {t("detail.parking")}</span>
                  <span className="text-foreground font-medium">{property.parking}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Compass className="w-4 h-4" /> {t("detail.orientation")}</span>
                  <span className="text-foreground font-medium">{property.orientation}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> {t("detail.tenure")}</span>
                  <span className="text-foreground font-medium">{property.tenure}</span>
                </div>
              </div>

              <Button variant="gold" className="w-full mb-3" asChild>
                <a
                  href={`https://api.whatsapp.com/send?phone=601110508741&text=${encodeURIComponent(`Hi, I'm interested in【${title}】and would like to know more.`)}`}
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
