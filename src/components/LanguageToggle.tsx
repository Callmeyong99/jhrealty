import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageToggle = ({ variant = "nav" }: { variant?: "nav" | "detail" }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const toggle = () => {
    const next = isEn ? "zh" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  if (variant === "detail") {
    return (
      <Button variant="ghost" size="sm" onClick={toggle} className="gap-1.5 text-foreground">
        <Globe className="w-4 h-4" />
        {isEn ? "中文" : "EN"}
      </Button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-gold transition-colors font-body text-sm tracking-wide"
    >
      <Globe className="w-4 h-4" />
      {isEn ? "中文" : "EN"}
    </button>
  );
};

export default LanguageToggle;
