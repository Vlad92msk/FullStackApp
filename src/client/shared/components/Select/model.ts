export type Tokenfield = 'hidden' | 'check';

export type OptionValue = string | number;

export type SelectValue = OptionValue | Array<OptionValue> | null;

export interface SelectContext {
  selectValue: SelectValue,
  handleChange: (valueOption: OptionValue) => void;
  searchValue: string,
  tokenfield?: Tokenfield,
}
