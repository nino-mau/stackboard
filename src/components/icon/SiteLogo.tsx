type SiteLogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function SiteLogo({
  width = 52,
  height = 52,
  className = '',
}: SiteLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 52 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.1 5.2H5.2V39H22.1V5.2Z" className="fill-primary-400" />
      <path d="M35.75 13H18.85V46.75H35.75V13Z" className="fill-primary" />
      <path d="M46.8 20.8H31.2V52H46.8V20.8Z" className="fill-primary-600" />
    </svg>
  );
}
