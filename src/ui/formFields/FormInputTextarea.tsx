import React from "react";
import { FieldHookConfig, useField } from "formik";
import clsx from "clsx";

interface TextInputProps {
  label?: string;
  className?: string;
  charCount?: number;
  containerClassName?: string;
}

type Props = TextInputProps & FieldHookConfig<string>;

const FormInputTextarea: React.FC<Props> = ({
  label,
  className,
  charCount = undefined,
  containerClassName,
  ...props
}) => {
  const [field, meta, helpers] = useField<string>(props);
  const hasError = meta.touched && !!meta.error;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

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

      <div className={clsx("flex items-center gap-2 relative w-full h-full")}>
        <textarea
          className={clsx(
            "textarea  grow ",
            {
              "border-border-default": !hasError,
              "focus-within:border-border-dark": !hasError,
            },
            className,
            hasError && "text-error border-error focus-within:border-error",
          )}
          {...field}
          onChange={handleChange}
          {...(props as React.InputHTMLAttributes<HTMLTextAreaElement>)}
          maxLength={charCount}
        />

        <div className="absolute left-2 bottom-1 text-sm flex text-text-light">
          <span>{charCount ?? "∞"}</span>/<span>{field.value?.length}</span>
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error text-sm ps-1 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormInputTextarea;
