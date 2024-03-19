import React, { useState } from "react";
import { twJoin } from "tailwind-merge";
import { ArrowIcon } from "@/app/_components/icon";

const GenerateText = () => {
  const [value, setValue] = useState("");

  return (
    <div
      className={twJoin(
        "p-4",
        "border border-neutral4",
        "w-full h-full min-h-[148px]",
        "flex flex-col justify-between"
      )}
    >
      <textarea
        className="w-full h-22 bg-transparent focus-visible:outline-none"
        style={{ resize: "none" }}
        placeholder="A beautiful forest and futuristic city where there are a lot of
              artistic buildings."
        onChange={(e) => setValue(e.target.value)}
      >
        {value}
      </textarea>
      <button
        className={twJoin(
          "flex items-center gap-x-1 ml-auto text-sm text-neutral4",
          value && "text-primary1"
        )}
      >
        Generate
        <ArrowIcon />
      </button>
    </div>
  );
};

export default GenerateText;
