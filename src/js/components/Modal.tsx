import React from "react";
import { useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { GamesContext } from "../store/GamesContextProvider";

type ModalProps = React.HTMLAttributes<HTMLDialogElement>;

/**
 * Use forwardRef here for Jest / JSDOM as they don't
 * yet support passing ref directly as props.
 */
const Modal: React.FC<ModalProps> = ({ children, ...rest }) => {
  const gamesCtx = useContext(GamesContext);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (gamesCtx.isModalOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [gamesCtx.isModalOpen]);

  function handleModalClose() {
    gamesCtx.handleUpdateModalVisibility(false);
  }

  return createPortal(
    <dialog
      className="modal"
      ref={dialog}
      {...rest}
      data-testid="modal"
      onClose={handleModalClose}
    >
      {children}
      <form method="dialog">
        <button
          className="button-default"
          onClick={(e) => {
            e.preventDefault();
            handleModalClose();
          }}
        >
          Close
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")!,
  );
};

Modal.displayName = "Modal";

export default Modal;
