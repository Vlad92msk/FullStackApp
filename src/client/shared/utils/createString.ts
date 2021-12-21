export const createString = (str: string[], join?: string): string => str.reduce((acc, el) => el ? `${acc}${join}${el}`: acc, '')
