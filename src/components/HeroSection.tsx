import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-property.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="豪华别墅外观"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl md:text-3xl font-bold text-primary-foreground tracking-wide"
        >
          锦程<span className="text-gradient-gold">地产</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center gap-8 text-primary-foreground/80 font-body text-sm tracking-wide"
        >
          <a href="#properties" className="hover:text-gold transition-colors">精选房源</a>
          <a href="#services" className="hover:text-gold transition-colors">专业服务</a>
          <a href="#contact" className="hover:text-gold transition-colors">联系我们</a>
        </motion.div>
      </nav>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gold font-body text-sm md:text-base tracking-[0.25em] uppercase mb-4"
          >
            专业 · 诚信 · 高效
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            为您找到
            <br />
            <span className="text-gradient-gold italic">理想家园</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-primary-foreground/70 font-body text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
          >
            深耕房地产行业多年，以专业的市场分析和贴心的服务，助您实现置业梦想。
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
                免费咨询
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#properties">
                <MapPin className="w-4 h-4 mr-2" />
                浏览房源
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-primary/60 backdrop-blur-md border-t border-primary-foreground/10"
      >
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-wrap justify-center md:justify-between gap-8">
          {[
            { value: "500+", label: "成交套数" },
            { value: "98%", label: "客户满意度" },
            { value: "15年", label: "行业经验" },
            { value: "全城", label: "服务覆盖" },
          ].map((stat) => (
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
