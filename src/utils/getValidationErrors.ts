import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidatioErrors(err: ValidationError): Errors {
  const validationError: Errors = {};

  err.inner.forEach(element => {
    validationError[element.path] = element.message;
  });

  return validationError;
}
