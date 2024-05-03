import FormModalApply from "@/components/organisms/FormModalApply";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import prisma from "../../../../../../lib/prisma";
import { FC } from "react";
import { supabasePublicUrl } from "@/lib/supabase";
import { dateFormat } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


interface DetailJobPageProps {}

async function getJobDetail(id: string) {
  const session = await getServerSession(authOptions);

  const data = await prisma.job.findFirst({
    where: {
      id,
    },
    include: {
      Company: {
        include: {
          CompanyOverview: true,
        },
      },
      CategoryJob: true,
    },
  });

  let imageUrl;

  if (data?.Company?.CompanyOverview[0].image) {
    imageUrl = await supabasePublicUrl(
      data?.Company?.CompanyOverview[0].image,
      "company"
    );
  } else {
    imageUrl = "/images/company2.png";
  }
  const applicants = data?.applicants || 0;
  const needs = data?.needs || 0;
  const isApply = await prisma.applicant.count({
    where: {
      userId: session?.user?.id,
    },
  });
  const benefits: any = data?.benefits;

  if (!session) {
    return {
      ...data,
      image: imageUrl,
      benefits,
      applicants,
      needs,
      isApply: 0,
    };
  }
  return {
    ...data,
    image: imageUrl,
    benefits,
    applicants,
    needs,
    isApply,
  };
}

const DetailJobPage = async ({ params }: { params: { id: string } }) => {
  const data = await getJobDetail(params.id);
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="px-32 pt-10 bg-slate-100 pb-14">
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
            href={`/detail/company/${data?.Company?.CompanyOverview[0].id}`}
          >
            {data?.Company?.CompanyOverview[0].name}
          </Link>{" "}
          /
          <Link
            className="hover:underline hover:text-black"
            href={`/detail/job/${data?.id}`}
          >
            {data?.roles}
          </Link>
        </div>
        <div className="flex flex-row items-center justify-between w-11/12 p-5 mx-auto mt-10 bg-white shadow ">
          <div>
            <Image src={data.image} alt={data.image} width={88} height={88} />
            <div>
              <div className="text-2xl font-semibold">{data?.roles}</div>
              <div className="text-muted-foreground">
                {data?.Company?.CompanyOverview[0].location} . {data?.jobType}
              </div>
            </div>
          </div>
          {session ? (
            <>
              {data.isApply === 1 ? (
                <Button disabled className="px-12 py-6 text-lg bg-green-500">
                  Applied
                </Button>
              ) : (
                <FormModalApply
                  image={data.image}
                  roles={data.roles!!}
                  jobType={data.jobType!!}
                  location={data?.Company?.CompanyOverview[0].location!!}
                  id={data.id}
                  isApply={data.isApply}
                />
              )}
            </>
          ) : (
            <Button variant="outline" disabled>
              Sign in First
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-row items-start gap-10 px-32 py-16">
        <div className="w-3/4">
          <div className="mb-16">
            <div className="text-4xl font-semibold">Description</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: data?.description!! }}
            ></div>
          </div>
          <div className="mb-16">
            <div className="text-4xl font-semibold">Responsibilities</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: data?.responsibility!! }}
            ></div>
          </div>
          <div className="mb-16">
            <div className="text-4xl font-semibold">Who You Are</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: data?.whoYouAre!! }}
            ></div>
          </div>
          <div className="mb-16">
            <div className="text-4xl font-semibold">Nica-To-Haves</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: data?.niceToHaves!! }}
            ></div>
          </div>
        </div>
        <div className="w-1/4">
          <div>
            <div className="text-3xl font-semibold">About this Role</div>
            <div className="p-4 mt-6 bg-slate-50">
              <div className="mb-2">
                <span className="font-semibold">
                  {data?.applicants} Applied
                </span>
                <span className="text-gray-600">
                  {" "}
                  of {data?.needs} capacity
                </span>
              </div>
              <Progress
                value={(data?.applicants || 0 / data?.needs || 0) * 100}
              />
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Apply Before</div>
                <div className="font-semibold">
                  {dateFormat(data.dueDate!!)}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Job Posted On</div>
                <div className="font-semibold">
                  {dateFormat(data.datePosted!!)}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Job Type</div>
                <div className="font-semibold">{data?.jobType}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Salary</div>
                <div className="font-semibold">
                  ${data?.salaryFrom}-${data?.salaryTo} USD
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-10" />
          <div>
            <div className="text-3xl font-semibold">Categories</div>
            <div className="inline-flex gap-4 my-10">
              <Badge>{data?.CategoryJob?.name}</Badge>
            </div>
          </div>
          <Separator className="my-10" />
          <div>
            <div className="text-3xl font-semibold">Required Skills</div>
            <div className="inline-flex gap-4 my-10">
              {data?.requiredSkills?.map((item: any, i: number) => (
                <Badge key={item + i} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-32 pb-16">
        <Separator className="mb-14" />
        <div className="mb-6">
          <div className="text-3xl font-semibold">Perks & Benefits</div>
          <div className="mt-1 text-gray-500">
            This job comes with several perks and benefits
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5">
          {data?.benefits?.map((item: any, i: number) => (
            <div key={i}>
              <BiCategory className="w-12 h-12 text-primary" />
              <div className="mt-6 text-xl font-semibold">{item.benefit}</div>
              <div className="mt-3 text-sm text-gray-500">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailJobPage;
