import React from "react";
import { useFormikContext } from "formik";
import FormRadioGroup, {
  RadioOption,
  RadioType,
} from "@/ui/formFields/FormRadioGroup";
import { CalcFormValues, Heir, Spouse } from "@/app/calc/ui/Form";
import TextInput from "@/ui/inputs/textInput";

interface Props {}

const options: RadioOption[] = [
  { label: "مجرد", value: "not-married" },
  { label: "زوج(شوهر دارد)", value: "husband" },
  { label: "زوجه(زن دارد)", value: "wife" },
];

export default function Deceased({}: Props): React.ReactNode {
  const formik = useFormikContext<CalcFormValues>();

  const countOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value as Spouse;
    const count = formik.values.spouse !== "wife" ? 0 : +value;

    const heir: Heir = {
      count: count,
      relationship: "spouse",
      gender: "female",
    };

    const heirs = formik.values.heirs.filter(
      (heir) => heir.relationship !== "spouse",
    );

    heirs.push(heir);

    formik.values.heirs = heirs;
  };

  return (
    <div>
      <FormRadioGroup
        title={"تاهل متوفی"}
        name={"spouse"}
        options={options}
        radioType={RadioType.button}
        className="flex gap-4 max-w-1/4"
        radioItemClassName=""
      />

      {formik.values.spouse === "wife" && (
        <TextInput
          onChange={countOnChange}
          type={"number"}
          inputMode={"numeric"}
        />
      )}
    </div>
  );
}
