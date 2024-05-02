import { Badge } from "@/components/ui/badge";
import { CompanyType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface CompanyCardProps extends CompanyType {}

const CompanyCard: FC<CompanyCardProps> = ({
  image,
  name,
  description,
  totalJobs,
  industry,
  id,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/detail/company/" + id)}
      className="p-6 border cursor-pointer border-border"
    >
      <div className="flex flex-row items-start justify-between ">
        <Image src={image} alt={image} width={66} height={66} />
        <Badge>{totalJobs} Jobs</Badge>
      </div>
      <div className="my-4">
        <div className="mb-2 text-lg font-semibold">{name}</div>
        <div
          className="text-sm text-muted-foreground line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
      <div className="space-x-2">
        <Badge variant="outline">{industry}</Badge>
      </div>
    </div>
  );
};

export default CompanyCard;
