import { useMemo } from "react";
import { IField } from "../fields/types";

export const useGetFormInfo = (data: IField[]) => {
  const details = useMemo(() => {
    const info = { Ok: "Add", id: 0 };
    const fld = data.find((d) => d.name === "id");
    if (!isNaN(parseFloat(fld?.value as string))) {
      info.Ok = "Update";
      if (fld?.value && !isNaN(parseFloat(fld.value as string)))
        info.id = parseFloat(fld.value as string);
    }
    return info;
  }, [data]);
  return details;
};
