import { useState } from 'react';

const useSidebarToggle = () => {
  const [isOpen, setIsOpen] = useState(true);

  const setOpen = () => setIsOpen(true);
  const setClose = () => setIsOpen(false);

  return { isOpen, setOpen, setClose };
};

export { useSidebarToggle };
