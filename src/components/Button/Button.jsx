import { Link } from "react-router-dom";
import "./Button.css";
export default function Button({
  children,
  to,
  href,
  variant = "solid",
  type = "button",
  onClick,
  ...props
}) {
  const className = `btn btn--${variant}`;
  if (to)
    return (
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
