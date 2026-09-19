import { useEffect, useId, useRef } from "react";
import "./Dialog.css";
export default function Dialog({ title, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const node = ref.current;
    const previous = document.activeElement;
    node.showModal();
    return () => {
      node.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="dialog__close"
        onClick={onClose}
        aria-label="Back to site"
      >
        ×
      </button>
      <h2 id={titleId} className="dialog__title">
        {title}
      </h2>
      {children}
    </dialog>
  );
}
