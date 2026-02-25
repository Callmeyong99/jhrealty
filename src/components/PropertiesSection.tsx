import { motion } from "framer-motion";
import { Bath, BedDouble, Maximize } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    image: property1,
    title: "城市天际公寓",
    location: "市中心金融区",
    price: "¥680万",
    beds: 3,
    baths: 2,
    area: "168㎡",
  },
  {
    image: property2,
    title: "海景顶层豪宅",
    location: "滨海新区",
    price: "¥1,280万",
    beds: 4,
    baths: 3,
    area: "320㎡",
  },
  {
    image: property3,
    title: "花园独栋别墅",
    location: "城北生态区",
    price: "¥520万",
    beds: 5,
    baths: 3,
    area: "260㎡",
  },
];

const PropertiesSection = () => {
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
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">Featured Properties</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            精选<span className="text-gradient-gold italic"> 房源</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property, i) => (
            <motion.div
              key={property.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-5">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground font-body font-semibold text-sm px-4 py-1.5 rounded">
                  {property.price}
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-1">{property.title}</h3>
              <p className="text-muted-foreground font-body text-sm mb-4">{property.location}</p>
              <div className="flex gap-5 text-muted-foreground font-body text-sm border-t border-border pt-4">
                <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {property.beds}室</span>
                <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {property.baths}卫</span>
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
