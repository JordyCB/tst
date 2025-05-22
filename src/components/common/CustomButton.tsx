import React from "react";

interface ButtonProps {
  fill?: string; 
  color?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  width?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  onClick: () => void;
  placeholder: string;
  boxShadow?: boolean; 
}

const CustomButton: React.FC<ButtonProps> = ({
  fill = "black",
  color = "white",
  border = "none",
  borderRadius = "5px",
  padding = "10px 20px",
  width = "auto",
  fontFamily = "Source Sans 3, sans-serif",
  fontWeight = "500",
  fontSize = "16px",
  onClick,
  placeholder,
  boxShadow = false,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: fill,
        color,
        border,
        borderRadius,
        padding,
        width,
        fontFamily,
        fontWeight,
        fontSize,
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow: boxShadow ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      {placeholder}
    </button>
  );
};

export default CustomButton;
