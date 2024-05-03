"use client";
import SwitchTranslation from "@/components/atoms/Switchtranslation";
import MenuAuth from "@/components/organisms/MenuAuth";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslation();
  return (
    <header className="flex flex-row items-start justify-between px-32 py-5">
      <div className="inline-flex items-center gap-12">
        <div>
          <Image
            src="/images/logo2.png"
            alt="/images/logo2.png"
            width={160}
            height={36}
          />
        </div>
        <div>
          <Link
            href={"/find-jobs"}
            className="mr-4 font-medium text-gray-400 cursor-pointer"
          >
            {t("navbar.nav-item-1")}
          </Link>
          <Link
            href={"/find-companies"}
            className="font-medium text-gray-400 cursor-pointer"
          >
            {t("navbar.nav-item-2")}
          </Link>
        </div>
      </div>
      <div className="inline-flex items-center gap-4">
        <div className="inline-flex items-center h-8 gap-4">
          {session ? (
            <MenuAuth />
          ) : (
            <>
              <Button variant="link" onClick={() => router.push("/signin")}>
                {t("navbar.btn-signin")}
              </Button>
              <Button> {t("navbar.btn-signup")}</Button>
            </>
          )}
        </div>
        <SwitchTranslation />
      </div>
    </header>
  );
};

export default Navbar;
