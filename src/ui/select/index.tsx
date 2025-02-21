import ReactSelect, { Props as ReactSelectProps } from "react-select";
import clsx from "clsx";

interface SelectOption {
  value: string;
  label: React.ReactNode;
}

interface SelectProps extends Partial<ReactSelectProps<SelectOption, false>> {
  className?: string;
  options: SelectOption[];
  loading?: boolean;
  disabled?: boolean;
  value?: SelectOption | null;
  onChange?: (option: SelectOption | null) => void;
  error?: boolean; // New prop for error state
  showIndicator?: boolean;
}

const Select: React.FC<SelectProps> = ({
  className,
  options,
  placeholder = "انتخاب کنید",
  value,
  onChange,
  error = false,
  ...props
}) => {
  const document = typeof window !== "undefined" ? window.document : undefined;

  return (
    <ReactSelect
      id={props.name}
      instanceId={props.name}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "none",
          borderColor: error ? "red" : base.borderColor, // Apply red border color on error
          boxShadow: error ? "0 0 0 1px red" : base.boxShadow, // Apply red shadow on error
        }),
      }}
      classNames={{
        control: () =>
          clsx(controlStyles.base, { "border-red-500": error }, className), // Apply error border color
        placeholder: () => clsx(placeholderStyles, { "text-error": error }), // Apply error text color
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused }) =>
          clsx(isFocused && optionStyles.focus, optionStyles.base),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      menuPortalTarget={document?.body} // Mount the menu in the body
      noOptionsMessage={() => "موردی یافت نشد"}
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Select;

const controlStyles = {
  base: "border rounded-lg hover:cursor-pointer p-2 h-12",
};
const placeholderStyles = "text-gray-500 ps-1 py-0.5";
const selectInputStyles = "ps-1 py-0.5";
const valueContainerStyles = "px-1 pl-0 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
  "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
const indicatorsContainerStyles = "p-0 gap-1";
const clearIndicatorStyles =
  "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const dropdownIndicatorStyles =
  "p-0 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
const menuStyles = "p-3 mt-2 border border-gray-200 rounded-lg bg-base-100";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2",
  focus: "bg-gray-200 text-black rounded-md",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 border border-dashed border-gray-200 rounded-sm";
