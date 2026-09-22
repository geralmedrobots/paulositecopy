import { site } from "../../data/site.js";
export function ContactInformation() {
  return (
    <address className="contact-information">
      <a href={`tel:+351${site.phone.replaceAll(" ", "")}`}>
        Tel. {site.phone}
      </a>
      <a href={`tel:+351${site.mobile.replaceAll(" ", "")}`}>
        Tlm. {site.mobile}
      </a>
      <a href={`mailto:${site.email}`}>{site.email}</a>
      {site.addresses.map((address) => (
        <p key={address} lang="pt">
          {address}
        </p>
      ))}
    </address>
  );
}
