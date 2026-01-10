const template = (variables, { tpl }) => {
  const name = variables.componentName.replace(/^Svg/, '');
  
  // Manually inject <title> as first child of the SVG jsx
  const titleElement = {
    type: 'JSXElement',
    openingElement: {
      type: 'JSXOpeningElement',
      name: { type: 'JSXIdentifier', name: 'title' },
      attributes: [],
      selfClosing: false,
    },
    closingElement: {
      type: 'JSXClosingElement',
      name: { type: 'JSXIdentifier', name: 'title' },
    },
    children: [
      {
        type: 'JSXExpressionContainer',
        expression: { type: 'Identifier', name: 'title' },
      },
    ],
  };
  
  // Add title as first child of SVG
  variables.jsx.children.unshift(titleElement);
  
  return tpl`
import * as React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
  title?: string;
}

const ${name} = ({ size = 24, width = size, height = size, fill = 'currentColor', title = '${name}', ...props }: Props) => (
  ${variables.jsx}
);

export default ${name};
`;
};

// Remove "Svg" prefix from component names
function getComponentName({ basename }) {
  // basename is already PascalCase from the filename
  return basename;
}

module.exports = {
  typescript: true,
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  template,
  // Custom function to control component naming
  getComponentName,
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
