import React from "react";
import { useRef, useEffect, useState, use } from "react";
import { createPortal } from "react-dom";
import { GamesContext } from "../store/GamesContextProvider";

type ModalProps = React.HTMLAttributes<HTMLDialogElement>;

const Modal: React.FC<ModalProps> = ({ children, ...rest }) => {
  const gamesCtx = use(GamesContext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [portalRoot] = useState(() => document.getElementById("modal")!);

  useEffect(() => {
    if (gamesCtx.isModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [gamesCtx.isModalOpen]);

  function handleModalClose() {
    gamesCtx.handleUpdateModalVisibility(false);
  }

  return createPortal(
    <dialog
      className="modal"
      ref={dialogRef}
      {...rest}
      data-testid="modal"
      onClose={handleModalClose}
    >
      {gamesCtx.isModalOpen && (
        <>
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
        </>
      )}
    </dialog>,
    portalRoot,
  );
};

Modal.displayName = "Modal";

export default Modal;
