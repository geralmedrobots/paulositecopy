import { contactInfo } from "../../data/contact";
export default function ContactInfo({ compact = false, footer = false }) {
  return (
    <address className="contact-info">
      <div>
        Tel.{" "}
        <a href={`tel:+351${contactInfo.phone.replaceAll(" ", "")}`}>
          {contactInfo.phone}
        </a>
        <br />
        Tlm.{" "}
        <a href={`tel:+351${contactInfo.mobile.replaceAll(" ", "")}`}>
          {contactInfo.mobile}
        </a>
      </div>
      <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
      {(footer || compact ? contactInfo.footerAddresses : contactInfo.addresses)
        .slice(compact ? 1 : 0)
        .map((address) => (
          <p key={address}>{address}</p>
        ))}
    </address>
  );
}
