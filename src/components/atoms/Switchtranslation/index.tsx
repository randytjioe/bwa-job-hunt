import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import useLang from "@/hooks/useLang";

interface SwitchTranslationProps {}

const SwitchTranslation: FC<SwitchTranslationProps> = ({}) => {
  const { t } = useTranslation();
  const { changeLang, lang } = useLang();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("select-lang")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => changeLang("id")}
          className={lang === "id" ? "text-primary" : ""}
        >
          Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLang("en")}
          className={lang === "en" ? "text-primary" : ""}
        >
          Inggris
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchTranslation;
