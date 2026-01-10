import * as React from 'react';
interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
  title?: string;
}
const Cube = ({
  size = 24,
  width = size,
  height = size,
  fill = 'currentColor',
  title = "Cube",
  ...props
}: Props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={width} height={height} fill={fill} {...props}><title>{title}</title><path d="M80.5 218.5v203c0 22.9 12.2 44 32 55.4l175.8 101.6c9.9 5.7 21 8.6 32 8.6V357c0-22.9 12.2-44 32-55.4 66.4-38.4 132.9-76.7 199.3-115-5.5-9.6-13.5-17.7-23.4-23.4L352.3 61.5a64.16 64.16 0 0 0-64 0L112.5 163c-19.8 11.4-32 32.6-32 55.4z" opacity={0.4} /><path d="M551.6 186.5c5.5 9.6 8.6 20.6 8.6 32v203c0 22.9-12.2 44-32 55.4L352.3 578.5c-9.9 5.7-21 8.6-32 8.6V357c0-22.9 12.2-44 32-55.4l199.3-115z" /></svg>;
export default Cube;