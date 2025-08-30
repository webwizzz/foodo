import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      style={{
        padding: "0.8rem 0.9rem",
        background: "#fff",
        color: "#000",
        borderRadius: "999px",
        cursor: "pointer",
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1,
        letterSpacing: "0.000rem",
        boxShadow: "none",
        outline: "none",
        transition: "background 0.2s, color 0.2s",
        ...props.style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
