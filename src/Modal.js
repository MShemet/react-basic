import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    const modalInner = document.createElement('div');

    modalInner.classList.add('modal-inner');

    elRef.current = modalInner;
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');

    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(children, elRef.current);
};

export default Modal;
