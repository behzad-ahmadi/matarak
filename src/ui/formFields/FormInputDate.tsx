"use client";

import React, { useEffect, useRef } from "react";
import { FieldHookConfig, useField } from "formik";
import clsx from "clsx";
import DatePicker, { DateObject, DatePickerRef } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import english from "react-date-object/calendars/gregorian";
import english_en from "react-date-object/locales/gregorian_en";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { Hash } from "@/lib/config/constants";
import useModal from "@/hooks/useModal";

interface FormInputDateProps {
  label?: string;
  className?: string;
}

type Props = FormInputDateProps & FieldHookConfig<string>;

const FormInputDate: React.FC<Props> = ({ label, className, ...props }) => {
  const [field, meta, helpers] = useField<string>(props);
  const hasError = meta.touched && !!meta.error;
  const { handleClose, isOpen, handleOpen } = useModal({
    hash: Hash.datePicker,
  });
  const ref = useRef<DatePickerRef>(null);

  const handleChange = (d: DateObject) => {
    helpers.setValue(d.convert(english, english_en).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    // close calendar if back button pressed
    if (!isOpen) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ref.current?.isOpen && ref.current?.closeCalendar();
      handleClose();
    }
  }, [isOpen, handleClose]);

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className={clsx("text-base block mb-2 ", { "text-error": hasError })}
      >
        {label}
      </label>

      <div
        className={clsx(
          "input input-bordered flex items-center gap-2, relative text-inherit",
          {
            "input-bordered": !hasError,
            "focus-within:input-bordered": !hasError,
          },
          className,
          hasError && "!text-error border-error focus-within:border-error",
          props?.disabled &&
            "bg-base-200 border-1 border-base-200 !text-gray-600 ",
        )}
      >
        <DatePicker
          ref={ref}
          calendar={persian}
          className="rmdp-mobile"
          value={field.value ? new Date(field.value) : ""}
          onChange={handleChange}
          locale={persian_fa}
          onOpen={handleOpen}
          onClose={handleClose}
          disabled={props.disabled}
          render={(value, openCalendar) => {
            return (
              <input
                className="grow w-full "
                {...field}
                value={value}
                onClick={openCalendar}
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
              />
            );
          }}
        />

        <i className="pi pi-calender text-inherit" />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error text-sm ps-1 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormInputDate;
