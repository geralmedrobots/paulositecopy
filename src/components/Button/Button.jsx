import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Reusable CTA button. Renders an internal <Link>, an external <a>,
 * or a native <button> depending on the props provided.
 */
function Button({ children, to, href, variant = "solid", type = "button", onClick }) {
  const className = `btn btn--${variant}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
