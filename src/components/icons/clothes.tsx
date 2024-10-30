import {SVGProps} from "@/interfaces";

export const Clothes = ({width = 24, height = 18, color = "#9C784A"}: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 18"
      fill="none"
    >
      <path
        fill={color}
        d="M23.21 2.74 18.358.093a.75.75 0 0 0-.36-.094h-3a.75.75 0 0 0-.75.75 2.25 2.25 0 1 1-4.5 0 .75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.36.094L.789 2.739a1.477 1.477 0 0 0-.619 1.994l1.807 3.45A1.535 1.535 0 0 0 3.343 9h1.906v7.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V9h1.907a1.535 1.535 0 0 0 1.367-.817l1.806-3.45a1.477 1.477 0 0 0-.619-1.994ZM3.343 7.5a.058.058 0 0 1-.039-.012L1.507 4.056 5.25 2.014V7.5H3.343Zm13.906 9h-10.5v-15h1.575a3.75 3.75 0 0 0 7.348 0h1.577v15Zm3.445-9.013a.051.051 0 0 1-.038.013h-1.907V2.014l3.742 2.042-1.797 3.43Z"
      />
    </svg>
  );
};
