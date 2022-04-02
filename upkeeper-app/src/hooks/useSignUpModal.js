import { useState } from "react";

const useSignUpModal = () => {
  const [signUpWizardOpen, setSignUpWizardOpen] = useState(false);

  const toggleSignUpWizard = () => {
    setSignUpWizardOpen(!signUpWizardOpen);
  };

  return {
    signUpWizardOpen,
    toggleSignUpWizard,
  };
};

export default useSignUpModal;