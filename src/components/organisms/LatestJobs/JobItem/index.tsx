import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { JobType } from "@/types";
import Image from "next/image";
import { FC } from "react";

interface JobItemProps extends JobType {}

const JobItem: FC<JobItemProps> = ({
  image,
  jobType,
  name,
  type,
  location,
  category,
  skills,
}) => {
  return (
    <div className="flex flex-row items-start gap-6 p-8 border cursor-pointer border-border">
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
            <Badge
              key={item + i}
              variant="outline"
              className="rounded border-primary bg-primary/5 text-primary"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
export default JobItem;
