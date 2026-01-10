import * as React from 'react';
interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
  title?: string;
}
const Database = ({
  size = 24,
  width = size,
  height = size,
  fill = 'currentColor',
  title = "Database",
  ...props
}: Props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={width} height={height} fill={fill} {...props}><title>{title}</title><path d="M96 144v48c0 44.2 100.3 80 224 80s224-35.8 224-80v-48c0-44.2-100.3-80-224-80S96 99.8 96 144m0 125.8V352c0 44.2 100.3 80 224 80s224-35.8 224-80v-82.2c-14.8 9.8-31.8 17.7-49.5 24-47 16.8-108.7 26.2-174.5 26.2s-127.6-9.5-174.5-26.2c-17.6-6.3-34.7-14.2-49.5-24m0 160V496c0 44.2 100.3 80 224 80s224-35.8 224-80v-66.2c-14.8 9.8-31.8 17.7-49.5 24-47 16.8-108.7 26.2-174.5 26.2s-127.6-9.5-174.5-26.2c-17.6-6.3-34.7-14.2-49.5-24" opacity={0.4} /><path d="M96 269.8V192c0 44.2 100.3 80 224 80s224-35.8 224-80v77.8c-14.8 9.8-31.8 17.7-49.5 24-47 16.8-108.7 26.2-174.5 26.2s-127.6-9.5-174.5-26.2c-17.6-6.3-34.7-14.2-49.5-24m0 160V352c0 44.2 100.3 80 224 80s224-35.8 224-80v77.8c-14.8 9.8-31.8 17.7-49.5 24-47 16.8-108.7 26.2-174.5 26.2s-127.6-9.5-174.5-26.2c-17.6-6.3-34.7-14.2-49.5-24" /></svg>;
export default Database;