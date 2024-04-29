import BannerSignUp from "@/components/organisms/BannerSignUp";
import Category from "@/components/organisms/Category";
import Clients from "@/components/organisms/Clients";
import FeaturedJobs from "@/components/organisms/FeaturedJobs";
import Hero from "@/components/organisms/Hero";
import LatestJobs from "@/components/organisms/LatestJobs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 right-0 w-2/3 h-screen -z-10">
        <Image src="/images/pattern.png" alt="/images/pattern.png" fill />
      </div>
      <div className="px-32 mb-10">
        <Hero />
        <Clients />
        <Category />
        <BannerSignUp />
        <FeaturedJobs />
        <LatestJobs />
      </div>
    </>
  );
}
