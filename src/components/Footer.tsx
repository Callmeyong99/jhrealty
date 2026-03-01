import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-foreground py-10">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="font-display text-xl font-bold text-background mb-2">
          {t("brand.name1")}<span className="text-gradient-gold">{t("brand.suffix")}</span>
        </div>
        <p className="text-background/40 font-body text-sm">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
