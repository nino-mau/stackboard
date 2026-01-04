/**
 * Get name from email
 */
export function getNameFromEmail(email: string) {
  const parts = email.split('@');
  const names = parts[0].split('.');

  if (names.length > 1) {
    const firstName = names[0];
    const secondName = names[1];

    return (
      capitalizeFirstLetter(firstName) +
      ' ' +
      capitalizeFirstLetter(secondName)
    ).trim();
  }

  return capitalizeFirstLetter(names[0]).trim();
}

/**
 * Get initials from string
 */
export function getInitials(name: string) {
  if (name.length === 0) return '';

  // Split the name by spaces
  const names = name.split(' ');
  // Extract the first letter of each name and convert it to uppercase
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join('');

  return initials;
}

/**
 * Capitalize first letter of a string
 */
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get name of the current page from pathname
 */
export function getPageName(pathname: string): string {
  return pathname.split('/').pop() ?? '';
}

/**
 * Get name of the current section from pathname (section for projects/project/1
 * is projects)
 */
export function getSectionName(pathname: string): string {
  return pathname.split('/').at(1) ?? '';
}

/**
 * Get random array item
 */
export function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Generate uuid v4
 */
export function getUUID() {
  return crypto.randomUUID();
}
