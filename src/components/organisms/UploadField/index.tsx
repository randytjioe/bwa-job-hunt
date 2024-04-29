import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ChangeEvent, FC, useRef, useState } from "react";

interface UploadFieldProps {
  form: any;
}

const UploadField: FC<UploadFieldProps> = ({ form }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nameFile, setNameFile] = useState<string>("Attach Resume / CV");

  const handleSelectFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNameFile(e.target.files[0].name);
      form.setValue("resume", e.target.files[0]);
    }
  };
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="font-semibold">Attach your resume</div>
      <div>
        <div>
          <div
            onClick={handleSelectFile}
            className="p-3 text-xs font-semibold text-center border-2 border-dashed cursor-pointer text-primary border-primary"
          >
            {nameFile}
          </div>
        </div>
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadField;
