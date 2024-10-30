import {SVGProps} from "@/interfaces";

export const Shop = ({width = 22, height = 22, color = "#9C784A"}: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M20.95 4.893a.75.75 0 0 0-.576-.27H5.25l-.458-2.517A1.5 1.5 0 0 0 3.316.874H1.624a.75.75 0 0 0 0 1.5H3.31l2.397 13.152c.07.39.243.755.5 1.057a2.625 2.625 0 1 0 4.162.79h4.258a2.625 2.625 0 1 0 2.371-1.5H7.92a.75.75 0 0 1-.738-.615l-.297-1.634h10.875a2.25 2.25 0 0 0 2.213-1.848l1.14-6.268a.75.75 0 0 0-.165-.615ZM9.123 18.499a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Zm9 0a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Zm.375-6.991a.75.75 0 0 1-.74.616H6.612l-1.09-6h13.952l-.976 5.384Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
