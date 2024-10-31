import {SVGProps} from "@/interfaces";

export const Profile = ({width = 20, height = 20, color = "#9C784A"}: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M10 .25C4.615.25.25 4.615.25 10s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75C19.744 4.618 15.382.256 10 .25ZM4.945 16.516a6 6 0 0 1 10.11 0 8.234 8.234 0 0 1-10.11 0ZM7 9.25a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm9.165 6.226a7.469 7.469 0 0 0-3.38-2.695 4.5 4.5 0 1 0-5.57 0 7.469 7.469 0 0 0-3.38 2.695 8.25 8.25 0 1 1 12.33 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
