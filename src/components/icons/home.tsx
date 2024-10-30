import {SVGProps} from "@/interfaces";

export const Home = ({width = 18, height = 19, color = "#9C784A"}: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 18 19">
      <path
        fill={color}
        fillRule="evenodd"
        d="m17.515 7.728-7.5-7.076a1.5 1.5 0 0 0-2.029-.01l-.01.01L.485 7.728A1.5 1.5 0 0 0 0 8.833V17.5A1.5 1.5 0 0 0 1.5 19H6a1.5 1.5 0 0 0 1.5-1.5V13h3v4.5A1.5 1.5 0 0 0 12 19h4.5a1.5 1.5 0 0 0 1.5-1.5V8.833a1.5 1.5 0 0 0-.485-1.105ZM16.5 17.5H12V13a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 6 13v4.5H1.5V8.833l.01-.01L9 1.75l7.49 7.072.01.009V17.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
