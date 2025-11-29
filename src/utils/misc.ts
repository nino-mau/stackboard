/**
 * Return a name string from a given email string
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
 * Return given string with capitalized first letter
 */
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
