const template = (variables, { tpl }) => {
  return tpl`
import * as React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
}

const ${variables.componentName} = ({ size = 24, width = size, height = size, fill = 'currentColor', ...props }: Props) => (
  ${variables.jsx}
);

export default ${variables.componentName};
`;
};

module.exports = {
  typescript: true,
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  template,
  svgProps: {
    width: '{width}',
    height: '{height}',
    fill: '{fill}',
  },
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      {
        name: 'removeAttrs',
        params: {
          attrs: '(fill|stroke)',
        },
      },
    ],
  },
};
