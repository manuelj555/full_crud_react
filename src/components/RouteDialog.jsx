import { useNavigate } from "react-router";
import { Dialog } from "./Dialog";

export function RouteDialog({ children, className = "", redirectUrl }) {
  const navigate = useNavigate();

  function redirect() {
    if (redirectUrl) {
      navigate(redirectUrl);

      return false
    }
  }

  return (
    <Dialog
      className={className}
      onClose={redirect}
    >
      {children}
    </Dialog>
  )
}
