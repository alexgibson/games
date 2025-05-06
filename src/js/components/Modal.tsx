import React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export type ModalHandle = {
  open: () => void;
};

type ModalProps = React.HTMLAttributes<HTMLDialogElement>;

/**
 * Use forwardRef here for Jest / JSDOM as they don't
 * yet support passing ref directly as props.
 */
const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ children, ...rest }, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open() {
        dialog.current.showModal();
      },
    }));

    return createPortal(
      <dialog className="modal" ref={dialog} {...rest} data-testid="modal">
        {children}
        <form method="dialog">
          <button className="button-default">Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")!,
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
