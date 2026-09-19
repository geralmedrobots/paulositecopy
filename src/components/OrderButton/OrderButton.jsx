import { useState } from "react";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import Media from "../Media/Media";
import ContactForm from "../ContactForm/ContactForm";
import ContactInfo from "../ContactInfo/ContactInfo";
export default function OrderButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Order Now</Button>
      {open && (
        <Dialog
          title="Thank you for your interest!"
          onClose={() => setOpen(false)}
        >
          <div className="dialog__grid">
            <Media name="order-ultrabot" eager />
            <div>
              <p>
                Let us know how many Ultrabots you would like to order. We will
                get back to you with a quote as soon as possible.
              </p>
              <ContactForm kind="order" />
              <ContactInfo compact />
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
