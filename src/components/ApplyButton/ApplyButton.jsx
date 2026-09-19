import { useState } from "react";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import Media from "../Media/Media";
import { contactInfo } from "../../data/contact";
export default function ApplyButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Apply</Button>
      {open && (
        <Dialog title="JOB APPLICATION" onClose={() => setOpen(false)}>
          <div className="dialog__grid">
            <Media name="application-team" eager />
            <div>
              <p>
                Please send us an email in English or Portuguese with a cover
                letter and resume to{" "}
                <a href={`mailto:${contactInfo.recruitment}`}>
                  {contactInfo.recruitment}
                </a>
                .
              </p>
              <p>Thank you for your interest!</p>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
