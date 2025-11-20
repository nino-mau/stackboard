'use client';

import { addCollection, IconifyJSON } from '@iconify/react';
import solarIconsSymbol from '@iconify-json/solar/icons.json';

// Register solar icon set
addCollection(solarIconsSymbol as IconifyJSON);

export default function IconifySetup() {
  return null;
}
