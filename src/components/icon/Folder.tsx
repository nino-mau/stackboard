import * as React from 'react';
interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
  title?: string;
}
const Folder = ({
  size = 24,
  width = size,
  height = size,
  fill = 'currentColor',
  title = "Folder",
  ...props
}: Props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={width} height={height} fill={fill} {...props}><title>{title}</title><path d="M64.4 160v288c0 6.3.9 12.4 2.6 18.1-.2-5.7.5-11.5 2.5-17.3l48-144C124 285.2 142.4 272 163 272h381.4v-64c0-35.3-28.7-64-64-64H363.1c-6.9 0-13.7-2.2-19.2-6.4l-38.4-28.8C294.4 100.5 281 96 267.1 96H128.4c-35.3 0-64 28.7-64 64" opacity={0.4} /><path d="M115 512h394.8c20.7 0 39-13.2 45.5-32.8l48-144c10.4-31.1-12.8-63.2-45.5-63.2H163c-20.7 0-39 13.2-45.5 32.8l-48 144C59.1 479.9 82.3 512 115 512" /></svg>;
export default Folder;