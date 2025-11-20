type SiteLogoProps = {
  width?: number;
  height?: number;
};

export default function SiteLogo({ width = 52, height = 52 }: SiteLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.1 5.2H5.2V39H22.1V5.2Z"
        className="fill-orange-400"
        fill="#FB923C"
      />
      <path
        d="M35.75 13H18.85V46.75H35.75V13Z"
        className="fill-orange-500"
        fill="#F97316"
      />
      <path
        d="M46.8 20.8H31.2V52H46.8V20.8Z"
        className="fill-orange-600"
        fill="#EA580C"
      />
    </svg>
  );
}
