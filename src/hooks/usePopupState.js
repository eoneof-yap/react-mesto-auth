import { useState } from 'react';

export default function PopupState() {
  const [isrOpen, setIsOpen] = useState();
  return [isrOpen, setIsOpen];
}

export function usePopupState(arg) {
  const { isrOpen, setIsOpen } = PopupState();
  setIsOpen(arg);
  return isrOpen;
}
