import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bath, BedDouble, Maximize, MapPin, Calendar, Car, Compass, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPropertyById } from "@/data/properties";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = getPropertyById(id || "");

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">房源未找到</h1>
          <Button variant="gold" onClick={() => navigate("/")}>返回首页</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="font-display font-semibold text-foreground">{property.title}</span>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <p className="flex items-center gap-2 text-muted-foreground font-body">
                <MapPin className="w-4 h-4" /> {property.location}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { icon: BedDouble, label: "卧室", value: `${property.beds}室` },
                { icon: Bath, label: "卫浴", value: `${property.baths}卫` },
                { icon: Maximize, label: "面积", value: property.area },
                { icon: Compass, label: "朝向", value: property.orientation },
              ].map((stat) => (
                <div key={stat.label} className="bg-card rounded-lg p-4 text-center border border-border">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                  <p className="text-xs text-muted-foreground font-body mb-1">{stat.label}</p>
                  <p className="font-display font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">房源介绍</h2>
              <p className="text-muted-foreground font-body leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">核心亮点</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.features.map((feature) => (
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
              <p className="text-3xl font-display font-bold text-accent mb-6">{property.price}</p>
              
              <div className="space-y-4 mb-8 text-sm font-body">
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 建成年份</span>
                  <span className="text-foreground font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Car className="w-4 h-4" /> 车位</span>
                  <span className="text-foreground font-medium">{property.parking}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2"><Maximize className="w-4 h-4" /> 面积</span>
                  <span className="text-foreground font-medium">{property.area}</span>
                </div>
              </div>

              <Button variant="gold" className="w-full mb-3" onClick={() => {
                const el = document.getElementById("contact");
                if (el) {
                  navigate("/");
                  setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
                } else {
                  navigate("/");
                }
              }}>
                预约看房
              </Button>
              <Button variant="hero-outline" className="w-full" onClick={() => navigate("/")}>
                返回首页
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
