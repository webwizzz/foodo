import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      style={{
        padding: "0.5rem 1.5rem",
        background: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "0.375rem",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "1rem",
        ...props.style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
