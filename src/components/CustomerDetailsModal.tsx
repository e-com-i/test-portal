// components/CustomerDetailsModal.tsx
"use client";

import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/Select";
import { countryCodeOptions } from "@/lib/constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
}

export interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  address?: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  countryCode: Yup.string().required("Country code is required"),
  address: Yup.string(), // optional
});

const CustomerDetailsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    address: "",
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input id="fullName" name="fullName" />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-600 mt-1 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Email
                </label>
                <Input id="email" name="email" type="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 mt-1 text-sm"
                />
              </div>

              {/* Country Code and Phone Number - inline */}
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label
                    htmlFor="countryCode"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Country Code
                  </label>

                  <Select
                    label="Country Code"
                    name="countryCode"
                    options={countryCodeOptions}
                  />
                  <ErrorMessage
                    name="countryCode"
                    component="div"
                    className="text-red-600 mt-1 text-sm"
                  />
                </div>

                <div className="flex-2">
                  <label
                    htmlFor="phone"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Input id="phone" name="phone" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600 mt-1 text-sm"
                  />
                </div>
              </div>

              {/* Address optional */}
              <div>
                <label
                  htmlFor="address"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Address (Optional)
                </label>
                <Textarea id="address" name="address" rows={3} />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-600 mt-1 text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 mt-6 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
