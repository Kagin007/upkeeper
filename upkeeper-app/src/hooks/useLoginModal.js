import { useState } from "react";

const useLoginModal = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  const toggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  return {
    loginOpen,
    toggleLogin,
  };
};

export default useLoginModal;