import Image from "next/image";
import { FC } from "react";
import FormSearch from "../FormSearch";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="w-1/2">
        <div className="relative font-semibold text-7xl text-slate-600 w-max">
          Discover <br />
          more than <br /> <span className="text-primary">5000+ Jobs</span>
        </div>
        <Image
          src={"/images/pattern2.png"}
          alt="/images/pattern2.png"
          width={455}
          height={32}
          className="mb-5"
        />
        <div>
          Great platform for the job seeker that searching for new career
          heights and passionate about startups.
        </div>
        <FormSearch />
      </div>
      <div>
        <Image
          src={"/images/hero.png"}
          alt="/images/hero.png"
          width={501}
          height={710}
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Hero;
