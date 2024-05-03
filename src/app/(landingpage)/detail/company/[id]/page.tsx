import LatestJobs from "@/components/organisms/LatestJobs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { HiOfficeBuilding, HiOutlineLocationMarker } from "react-icons/hi";
import prisma from "../../../../../../lib/prisma";
import { supabasePublicUrl } from "@/lib/supabase";
import { assert } from "console";
import { dateFormat } from "@/lib/utils";
import { CompanyTeam } from "@prisma/client";

type params = {
  id: string;
};
interface DetailCompanyPageProps {
  params: params;
}

async function getDetailCompany(id: string) {
  const data = await prisma.company.findFirst({
    where: {
      id,
    },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
      _count: {
        select: {
          Job: true,
        },
      },
    },
  });
  let imageUrl;
  if (data?.CompanyOverview[0].image) {
    imageUrl = await supabasePublicUrl(
      data?.CompanyOverview[0].image,
      "company"
    );
  } else {
    imageUrl = "/images/company2.png";
  }
  return { ...data, imageUrl };
}

const DetailCompanyPage: FC<DetailCompanyPageProps> = async ({ params }) => {
  const data = await getDetailCompany(params.id);
  return (
    <>
      {data && data.CompanyOverview && (
        <>
          <div className="px-32 pt-16 bg-slate-100 pb-14">
            <div className="inline-flex gap-3 text-sm text-muted-foreground">
              <Link className="hover:underline hover:text-black" href="/">
                Home
              </Link>{" "}
              /
              <Link
                className="hover:underline hover:text-black"
                href="/find-companies"
              >
                Companies
              </Link>{" "}
              /
              <Link
                className="hover:underline hover:text-black"
                href={`/detail/company/${data.id}`}
              >
                {data?.CompanyOverview[0]?.name}
              </Link>{" "}
            </div>
            <div>
              <div className="inline-flex items-start gap-6 mt-10">
                <Image
                  src={data.imageUrl}
                  alt={data.imageUrl}
                  width={150}
                  height={150}
                />
                <div>
                  <div className="inline-flex items-center gap-4">
                    <span className="text-4xl font-semibold">
                      {" "}
                      {data?.CompanyOverview[0]?.name}
                    </span>
                    <Badge>{data._count?.Job} Jobs</Badge>
                  </div>
                  <div className="mt-2">
                    <Link href="/" className="font-semibold text-primary">
                      {data?.CompanyOverview[0]?.website}
                    </Link>
                  </div>
                  <div className="inline-flex items-center gap-10 mt-6">
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="p-3 bg-white rounded-full">
                          <AiOutlineFire className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Founded</div>
                        <div className="font-semibold">
                          {dateFormat(
                            data?.CompanyOverview[0]?.dateFounded,
                            "MM, DD YYYY"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="p-3 bg-white rounded-full">
                          <BsPeople className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Employees</div>
                        <div className="font-semibold">
                          {data?.CompanyOverview[0]?.employee}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="p-3 bg-white rounded-full">
                          <HiOutlineLocationMarker className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Location</div>
                        <div className="font-semibold">
                          {data.CompanyOverview[0]?.location}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="p-3 bg-white rounded-full">
                          <HiOfficeBuilding className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Industry</div>
                        <div className="font-semibold">
                          {data.CompanyOverview[0]?.industry}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start gap-10 px-32 py-16">
            <div className="w-3/4">
              <div className="mb-16">
                <div className="text-4xl font-semibold">Company Profile</div>
                <div
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: data?.CompanyOverview[0]?.description,
                  }}
                ></div>
              </div>
              {data.CompanySocialMedia && (
                <div>
                  <div className="mb-4 text-3xl font-semibold">Contact</div>
                  <div className="flex items-center gap-5 w-[400px] flex-wrap">
                    <div className="inline-flex items-center gap-3 p-2 font-semibold border border-primary text-primary w-max">
                      <FacebookIcon />
                      <span className="text-sm">
                        {data.CompanySocialMedia[0]?.facebook}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-3 p-2 font-semibold border border-primary text-primary w-max">
                      <TwitterIcon />
                      <span className="text-sm">
                        {data.CompanySocialMedia[0]?.twitter}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-3 p-2 font-semibold border border-primary text-primary w-max">
                      <LinkedinIcon />
                      <span className="text-sm">
                        {data.CompanySocialMedia[0]?.linkedin}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/4">
              <div className="mb-4 text-3xl font-semibold">Tech Stack</div>
              <div className="text-sm text-gray-500">
                Learn about the technology and tools that Pattern uses.
              </div>
              <div className="flex flex-row flex-wrap items-center gap-4 mt-5 ">
                {data?.CompanyOverview[0]?.techStack?.map(
                  (item: string, i: number) => (
                    <Badge key={item + i}>{item}</Badge>
                  )
                )}
              </div>
            </div>
          </div>
          {data.CompanyTeam && (
            <div className="px-32">
              <Separator />
              <div className="my-16">
                <div className="mb-4 text-3xl font-semibold">Teams</div>
                <div className="grid grid-cols-5 gap-5 mt-5">
                  {data.CompanyTeam.map((data: CompanyTeam) => (
                    <div
                      key={data.id}
                      className="px-3 py-5 border border-border"
                    >
                      <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full " />
                      <div className="my-4 text-center">
                        <div className="text-sm font-semibold">{data.name}</div>
                        <div className="text-xs text-gray-500">
                          {data.position}
                        </div>
                      </div>
                      <div className="mx-auto w-max">
                        <div className="inline-flex gap-2">
                          <InstagramIcon className="w-4 h-4 text-gray-500" />
                          <LinkedinIcon className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </div>
          )}
        </>
      )}
      <div className="px-32">
        <LatestJobs />
      </div>
    </>
  );
};

export default DetailCompanyPage;
