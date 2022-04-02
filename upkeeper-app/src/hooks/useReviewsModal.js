import { useState } from "react";

const useModal = () => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const toggleReviewModal = () => {
    setReviewModalOpen(!reviewModalOpen);
  };

  return {
    reviewModalOpen,
    toggleReviewModal,
  };
};

export default useModal;
