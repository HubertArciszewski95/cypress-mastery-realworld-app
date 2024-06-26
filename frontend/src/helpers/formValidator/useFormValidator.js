import { useState } from "react";
import {
  usernameValidator,
  emailValidator,
  passwordValidator,
  genericValidator
} from "./inputValidators.js";

const touchErrors = errors => {
  return Object.fromEntries(
    Object.entries(errors).map(([field, fieldError]) => [
      field,
      { ...fieldError, dirty: true },
    ])
  );
};

export const useFormValidator = (form) => {
  const [errors, setErrors] = useState(() => {
    // Dynamically generate initial errors state based on form keys
    const initialErrors = Object.fromEntries(
      Object.keys(form).map((key) => [
        key,
        {
          dirty: false,
          error: false,
          message: "",
        },
      ])
    );
    return initialErrors;
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    // Iterate over the keys in the form
    Object.keys(form).forEach(key => {
      if (nextErrors[key].dirty && (field ? field === key : true)) {
        const fieldMessage = validateField(key, form);
        nextErrors[key].error = !!fieldMessage;
        nextErrors[key].message = fieldMessage;
        if (!!fieldMessage) isValid = false;
      }
    });

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  const validateField = (fieldName, form) => {
    // Implement your field-specific validation logic here
    const value = form[fieldName];
    let fieldMessage = "";

    // Apply specific validators for different fields
    switch (fieldName) {
      case 'username':
        fieldMessage = usernameValidator(value, form);
        break;
      case 'email':
        fieldMessage = emailValidator(value, form);
        break;
      case 'password':
        fieldMessage = passwordValidator(value, form);
        break;
      default:
        fieldMessage = genericValidator(value);
    }

    return fieldMessage;
  };

  return {
    errors,
    validateForm,
    onBlurField,
  };
};
