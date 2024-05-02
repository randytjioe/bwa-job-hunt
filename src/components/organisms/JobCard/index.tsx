import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { JobType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface JobCardProps extends JobType {}

const JobCard: FC<JobCardProps> = ({
  image,
  jobType,
  name,
  type,
  location,
  skills,
  needs,
  applications,
  id,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/detail/job/${id}`)}
      className="flex flex-row items-center justify-between w-full p-6 border border-border"
    >
      <div className="flex flex-row items-start gap-6">
        <div>
          <Image src={image} alt={image} width={64} height={64} />
        </div>
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="mb-2 text-sm text-muted-foreground">
            {type} . {location}
          </div>
          <div className="inline-flex items-center h-5 gap-2">
            <Badge variant="secondary">{jobType}</Badge>
            <Separator orientation="vertical" />
            {skills.map((item: string, i: number) => (
              <Badge key={i}>{item}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[200px]">
        <Button className="w-full" size="lg">
          Apply
        </Button>
        <div className="relative w-full h-2 mt-2 bg-gray-300">
          <Progress value={(applications / needs) * 100} className="mt-2" />
        </div>
        <div className="mt-2 text-sm text-center text-gray-500">
          <span className="font-semibold text-black">
            {applications} applied
          </span>{" "}
          of {needs} capacity
        </div>
      </div>
    </div>
  );
};

export default JobCard;
