import React from 'react';
import { ErrorMessage } from 'formik';

export function withFormikField(Component) {
  return ({ field, form, customErrorMessageValues = {}, ...props }) => (
    <Component
      error={!!(form.touched[field.name] && form.errors[field.name])}
      {...field}
      {...props}
      helperText={
        <ErrorMessage name={field.name}>
          {message =>
            
              message
          }
        </ErrorMessage>
      }
    />
  );
}
