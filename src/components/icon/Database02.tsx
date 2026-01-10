import * as React from 'react';
interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
  title?: string;
}
const Database02 = ({
  size = 24,
  width = size,
  height = size,
  fill = 'currentColor',
  title = "Database02",
  ...props
}: Props) => <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill} {...props}><title>{title}</title><path d="M12 21.998c4.418 0 8-1.343 8-3v-5.996c-9.2 4-14.5 1.332-16-.502v6.498c0 1.657 3.582 3 8 3" /><path d="M20 6C13.6 9.567 6.667 7.486 4 6v6.439c1.5 1.817 8.5 4.46 16 .497z" /><path d="M20 4.996c-7.2-5.2-13.667-2.166-16 0V6c2.667 1.5 9.6 3.6 16 0z" /><ellipse cx={12} cy={5} strokeWidth={1.5} rx={8} ry={3} /><path strokeWidth={1.5} d="M20 12c0 1.657-3.582 3-8 3s-8-1.343-8-3" /><path strokeWidth={1.5} d="M20 5v14c0 1.657-3.582 3-8 3s-8-1.343-8-3V5" /><path strokeLinecap="round" strokeWidth={1.5} d="M8 8v2M8 15v2" /></svg>;
export default Database02;