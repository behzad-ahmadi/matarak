import React from "react";
import { FieldHookConfig, useField } from "formik";
import clsx from "clsx";
import { applyMask } from "@/lib/helper";

interface TextInputProps {
  label?: string;
  className?: string;
  containerClassName?: string;
  iconEnd?: React.ReactNode;
  iconEndDivider?: boolean;
  formatter?: (value: string) => string;
  mask?: string;
  maskPrefix?: string;
  maskRegex?: RegExp;
}

type Props = TextInputProps & FieldHookConfig<string>;

const FormInputText: React.FC<Props> = ({
  label,
  iconEnd,
  formatter,
  mask,
  iconEndDivider,
  className,
  containerClassName,
  ...props
}) => {
  const [field, meta, helpers] = useField<string>(props);
  const hasError = meta.touched && !!meta.error;

  // Handle input change to apply formatter and mask
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (formatter) {
      value = formatter(value);
    }

    if (mask) {
      value = applyMask(value, mask);
    }

    helpers.setValue(value);
  };

  return (
    <div className={containerClassName}>
      <label
        htmlFor={props.id || props.name}
        className={clsx("text-base block mb-2 ", { "text-error": hasError })}
      >
        {label}
      </label>

      <div
        className={clsx(
          "input input-bordered flex items-center gap-2",
          {
            "border-border-default": !hasError,
            "focus-within:border-border-dark": !hasError,
          },
          className,
          hasError && "text-error border-error focus-within:border-error",
        )}
      >
        <input
          className="grow w-full"
          {...field}
          onChange={handleChange} // Use custom change handler
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />

        {iconEnd && iconEndDivider && (
          <div className="border-inherit border-[0.5px] h-full me-1"></div>
        )}

        <span className={clsx(hasError && "text-error")}>{iconEnd}</span>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error text-sm ps-1 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormInputText;
