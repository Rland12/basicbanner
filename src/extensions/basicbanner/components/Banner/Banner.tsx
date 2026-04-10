import * as React from 'react';

interface BannerProps {
  message: string;
}

const Banner = ({ message }: BannerProps) => {
  return (
    <div style={{
      background: "#EF3054",
      color: "white",
      padding: "12px",
      textAlign: "center",
      fontWeight: "bold"
    }}>
      {message}
    </div>
  );
};

export default Banner;