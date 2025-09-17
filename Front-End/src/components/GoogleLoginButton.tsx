import { useEffect, useRef } from "react";
import { loginWithGoogle } from "../services/authService";

interface GoogleLoginButtonProps {
  onSuccess: (user: any) => void;
  onError?: (err: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.google && divRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // keep this in .env
        callback: async (response: any) => {
          try {
            const res = await loginWithGoogle(response.credential);
            onSuccess(res.user); // user
            // Optionally pass token too
            localStorage.setItem("authToken", res.token);
          } catch (err) {
            if (onError) onError(err);
          }
        }

      });

      window.google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
      });
    }
  }, [onSuccess, onError]);

  return <div ref={divRef}></div>;
};

export default GoogleLoginButton;
