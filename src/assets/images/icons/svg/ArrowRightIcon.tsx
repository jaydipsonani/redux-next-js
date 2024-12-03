import React from "react";

const EditIcon = ({
  width = 38,
  height = 39,
  stroke = "#000",
  gradient = false,
}: {
  width?: number;
  height?: number;
  stroke?: string;
  gradient?: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 38 39"
    fill="none"
  >
    <path
      d="M13.9995 10L23.6103 19.6108L13.9995 29.2217"
      stroke={gradient ? "url(#paint0_linear_1555_53)" : stroke}
      strokeWidth="2.375"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {gradient && (
      <defs>
        <linearGradient
          id="paint0_linear_1555_53"
          x1="13.9995"
          y1="19.6108"
          x2="23.6103"
          y2="19.6108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7916" />
          <stop offset="1" stopColor="#FC4A1B" />
        </linearGradient>
      </defs>
    )}
  </svg>
);

export default EditIcon;