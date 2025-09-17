// src/global.d.ts

interface GoogleCallbackResponse {
  credential: string;
}

interface Google {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: GoogleCallbackResponse) => void;
      }) => void;
      renderButton: (
        parent: HTMLElement,
        options: {
          theme?: "outline" | "filled_blue" | "filled_black";
          size?: "small" | "medium" | "large";
          shape?: "rectangular" | "pill" | "circle" | "square";
        }
      ) => void;
      prompt: () => void;
    };
  };
}

interface Window {
  google: Google;
}
