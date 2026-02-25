import { motion } from "framer-motion";
import { Home, TrendingUp, FileText, Handshake } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "买房咨询",
    description: "根据您的需求和预算，为您精准匹配理想房源，全程陪同看房。",
  },
  {
    icon: TrendingUp,
    title: "卖房服务",
    description: "专业市场评估，制定最优定价策略，高效推广您的房产。",
  },
  {
    icon: FileText,
    title: "贷款协助",
    description: "对接多家银行资源，协助您获得最优贷款方案，省时省力。",
  },
  {
    icon: Handshake,
    title: "交易保障",
    description: "全程把控交易流程，确保合同安全，让您安心置业。",
  },
];

const ServicesSection = () => {
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
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">Our Services</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            专业<span className="text-gradient-gold italic"> 服务</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-lg p-8 text-center group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
