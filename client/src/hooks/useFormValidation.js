import { useState, useMemo } from "react";

function useFormValidation() {
  const [isValid, setValid] = useState(false);
  const validate = (fields) => {
    let errors = [];
    Object.entries(fields).map(([key, value]) => {
      if (!value) {
        errors.push(key);
      }
    });
    return setValid(!errors.length);
  };
  return useMemo(() => {
    return {
      validate,
      isValid,
    };
  }, [isValid]);
}

export default useFormValidation;
