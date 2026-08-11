import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function createIcon(path: React.ReactNode) {
  return function Icon({ className, ...props }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ?? "size-5"}
        {...props}
      >
        {path}
      </svg>
    );
  };
}

export const TrophyIcon = createIcon(
  <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4ZM7 5H4a3 3 0 0 0 3 3M17 5h3a3 3 0 0 1-3 3" />,
);

export const PlusIcon = createIcon(<path d="M12 5v14M5 12h14" />);

export const FlagIcon = createIcon(
  <path d="M5 3v18M5 4h11l-2 4 2 4H5" />,
);

export const TrashIcon = createIcon(
  <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />,
);

export const XIcon = createIcon(<path d="M18 6 6 18M6 6l12 12" />);
