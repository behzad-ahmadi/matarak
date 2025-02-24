import React, { Fragment } from "react";
import { FieldHookConfig, useField } from "formik";
import clsx from "clsx";
import Button from "@/ui/buttons/button";

export type RadioOption = {
  label: string;
  value: string | number;
  children?: React.ReactNode;
};

export enum RadioType {
  button = "btn",
  radio = "radio",
}

interface Props extends FieldHookConfig<string | number> {
  name: string;
  options: RadioOption[];
  className?: string;
  radioItemClassName?: string;
  radioType?: RadioType;
  disabled?: boolean;
  title?: string;
}

const FormRadioGroup = ({
  name,
  options,
  className,
  radioItemClassName,
  radioType = RadioType.button,
  ...props
}: Props) => {
  const [field, meta, helpers] = useField<string | number>(name);
  const hasError = meta.touched && !!meta.error;

  const handleChange = (value: string | number) => {
    helpers.setTouched(true);
    helpers.setValue(value);
  };

  const renderOptionContent = (option: RadioOption) => {
    if (radioType === RadioType.button) {
      return (
        <Button
          type="button"
          className={clsx(
            "flex-grow !rounded-md focus:bg-transparent",
            field.value === option.value
              ? "btn-accent outline-text-default !font-semibold"
              : "btn-ghost outline-text-light !font-normal",
            hasError && "btn-error",
            radioItemClassName,
          )}
          onClick={() => handleChange(option.value)}
          disabled={props.disabled}
        >
          {option.label}
          {option.children}
        </Button>
      );
    }

    if (radioType === RadioType.radio) {
      return (
        <div className="form-control">
          <label className="label cursor-pointer flex justify-start gap-2">
            <input
              type="radio"
              name={name}
              className="radio"
              value={option.value}
              onChange={() => handleChange(option.value)}
              checked={field.value === option.value}
              aria-label={option.label}
              disabled={props.disabled}
            />
            <span className="label-text text-right">{option.label}</span>
          </label>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      {props?.title && (
        <label className="text-base text-text-default mb-2 block">
          {props.title}
        </label>
      )}

      <div className={clsx("form-contr", className, hasError && "text-error")}>
        {options?.map((option: RadioOption) => (
          <Fragment key={option.value}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={field.value === option.value}
              onChange={() => handleChange(option.value)}
              className="hidden"
              aria-label={option.label}
              disabled={props.disabled}
            />

            {renderOptionContent(option)}
          </Fragment>
        ))}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormRadioGroup;
