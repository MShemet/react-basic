import { useEffect, useRef, FunctionComponent, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';

const Modal: FunctionComponent = ({ children }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  if (!elRef.current) {
    const modalInner = document.createElement('div');

    modalInner.classList.add('modal-inner');

    elRef.current = modalInner;
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');

    if (!modalRoot || !elRef.current) {
      return;
    }

    modalRoot.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(children, elRef.current);
};

export default Modal;
