export const createString = (str: any[], join?: string): string => str.reduce((acc, el) => el ? `${acc}${join}${el}`: acc, '')
