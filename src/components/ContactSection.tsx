import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("contact.successMessage"));
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-24 bg-primary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">{t("contact.subtitle")}</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              {t("contact.title1")}<span className="text-gradient-gold italic">{t("contact.title2")}</span>
            </h2>
            <p className="text-primary-foreground/60 font-body text-lg leading-relaxed mb-10">
              {t("contact.description")}
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, text: "138-0000-8888" },
                { icon: Mail, text: "contact@jincheng.com" },
                { icon: MapPin, text: "市中心商业大厦 28楼" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-primary-foreground/80 font-body">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="bg-primary-foreground/5 backdrop-blur-sm rounded-lg p-8 md:p-10 border border-primary-foreground/10"
          >
            <h3 className="text-xl font-display font-semibold text-primary-foreground mb-6">{t("contact.formTitle")}</h3>
            <div className="space-y-5">
              <Input
                placeholder={t("contact.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-primary-foreground/10 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-accent"
              />
              <Input
                placeholder={t("contact.phonePlaceholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-primary-foreground/10 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-accent"
              />
              <Textarea
                placeholder={t("contact.messagePlaceholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="bg-primary-foreground/10 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-accent resize-none"
              />
              <Button variant="gold" size="lg" className="w-full" type="submit">
                <Send className="w-4 h-4 mr-2" />
                {t("contact.submit")}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
