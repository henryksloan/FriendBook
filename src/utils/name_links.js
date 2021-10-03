export function nameToLink(name) {
  return name.toLowerCase().split(' ').join('_');
}

export function linkToName(link) {
  return link
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.substr(1))
    .join(' ');
}