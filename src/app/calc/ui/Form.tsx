"use client";

import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import Deceased from "@/app/calc/ui/Deceased";

export type Relationship =
  | "spouse"
  | "child"
  | "parent"
  | "sibling"
  | undefined;

export type Heir = {
  relationship: Relationship;
  gender: "male" | "female" | undefined;
  count?: number;
};

export type Spouse = "husband" | "wife" | "not-married";

export interface CalcFormValues {
  assets: number;
  spouse: Spouse;
  heirs: Heir[];
}

const submitForm = async (
  values: CalcFormValues,
  formik: FormikHelpers<CalcFormValues>,
) => {};

export default function CalcForm(): React.ReactNode {
  return (
    <div>
      <Formik<CalcFormValues>
        initialValues={{ assets: 0, spouse: "not-married", heirs: [] }}
        onSubmit={submitForm}
      >
        <Form>
          <Deceased />
        </Form>
      </Formik>
    </div>
  );
}
