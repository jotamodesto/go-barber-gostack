type Errors = Record<string, string>;

export default function getValidationErrors(
  error: import('yup').ValidationError
): Errors {
  const validationErrors = error.inner.reduce((accumulator, currentError) => {
    accumulator[currentError.path] = currentError.message;
    return accumulator;
  }, {} as Errors);

  return validationErrors;
}
