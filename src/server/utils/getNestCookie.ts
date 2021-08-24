export const getNestCookie = (name: string, target: any): string | undefined => {
  const matches = target.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}
