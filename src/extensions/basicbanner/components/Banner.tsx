import * as React from 'react';
import { useState } from 'react';

interface BannerProps {
  message: string;
  visibleStartDate?: string;
  fontSize?: number;
  type?: string;
}

const Banner = ({
  message,
  visibleStartDate,
  type,
  fontSize = 18
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
  const getBorderColor = (type?: string) => {
    switch (type) {
      case "Primary": return "#ff530D";
      case "Blue": return "#0033A0";
      case "Yellow": return "#FFC72C";
      case "Purple": return "#7F2268";
      case "Gray": return "#999999";
      default: return "#ff530D";
    }
  };
  return (
    <div style={{
      background: "#ffffff",
      color: "#000000",
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontWeight: 500,
      fontSize: `${fontSize}px`,
      border: `6px solid ${getBorderColor(type)}`,
      borderRadius: "0px 0px 6px 6px",
      marginBottom: "8px",
      position: "relative",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    }}>
      <div style={{ flex: 1, textAlign: "center" }}>
        {parseTokens(message)}
      </div>

      <span
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          right: "12px",
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