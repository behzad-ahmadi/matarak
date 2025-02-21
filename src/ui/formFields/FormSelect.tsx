import React from "react";
import { FieldHookConfig, useField } from "formik";
import clsx from "clsx";
import Select from "@/ui/select";
import { Props as ReactSelectProps } from "react-select";

interface SelectProps {
  label?: string;
  options: SelectOption[];
  hasError?: boolean;
}

type Props = SelectProps &
  FieldHookConfig<string> &
  ReactSelectProps<SelectOption, false>;

const FormInputSelect: React.FC<Props> = ({
  label,
  options,
  hasError,
  ...props
}) => {
  const [field, meta, helpers] = useField<string>(props);
  const _hasError = hasError || (meta.touched && !!meta.error);

  // Handle the change event
  const handleChange = (selectedOption: SelectOption | null) => {
    helpers.setValue(selectedOption?.value || "");
  };

  const { name, ...selectProps } = props;

  return (
    <div>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className={clsx("text-base block mb-2", { "text-error": _hasError })}
        >
          {label}
        </label>
      )}

      <Select
        name={name}
        value={
          options?.find(
            (option: SelectOption) => option.value === field.value,
          ) || null
        } // Map Formik value to Select
        onChange={handleChange} // Use custom change handler
        options={options}
        error={_hasError}
        {...selectProps}
      />

      {meta.touched && meta.error ? (
        <div className="text-error text-sm ps-1 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormInputSelect;
