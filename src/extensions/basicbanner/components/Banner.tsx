import * as React from 'react';
import { useState } from 'react';

interface BannerProps {
  message: string;
  visibleStartDate?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
}

const Banner = ({
  message,
  visibleStartDate,
  backgroundColor = "#EF3054",
  textColor = "white",
  fontSize = 16
}: BannerProps) => {

  const [visible, setVisible] = useState(true);

  //Date logic (can be expanded with end date, recurring logic, etc.)
  const now = new Date();
  const startDate = visibleStartDate ? new Date(visibleStartDate) : null;

  if (startDate && now < startDate) {
    return null;
  }
console.log("NOW:", now);
console.log("START:", startDate);
  if (!visible) return null;

  //Token parser
  const parseTokens = (text: string) => {
    return text
      .replace("{siteUrl}", window.location.origin)
      .replace("{pageUrl}", window.location.href);
  };

  return (
    <div style={{
      background: backgroundColor,
      color: textColor,
      padding: "12px",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: `${fontSize}px`,
      position: "relative"
    }}>
      {parseTokens(message)}

      <span
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        ✕
      </span>
    </div>
  );
};

export default Banner;