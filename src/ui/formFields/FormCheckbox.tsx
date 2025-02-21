import React from "react";
import { FieldHookConfig, useField } from "formik";
import clsx from "clsx";
import Checkbox from "@/ui/inputs/checkBox";

interface CheckboxProps {
  label: string;
  className?: string;
}

type Props = CheckboxProps & FieldHookConfig<boolean>;

const FormCheckbox = ({ label, className, ...props }: Props) => {
  const [field, meta, helpers] = useField<boolean>(props);
  const hasError = meta.touched && !!meta.error;

  const handleChange = (checked: boolean) => {
    helpers.setValue(checked);
  };

  return (
    <div>
      <Checkbox
        id={props.id || props.name}
        label={label}
        checked={field.value}
        onChange={handleChange}
        disabled={props.disabled}
        className={clsx(className, hasError && "text-error")}
      />
      {meta.touched && meta.error ? (
        <div className="text-error text-sm ps-1 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormCheckbox;
