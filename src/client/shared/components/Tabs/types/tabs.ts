export type TabsType = {
  elements: {
    key: string
    button: JSX.Element
    content: JSX.Element
  }[]
  beforeTabs?: JSX.Element
  afterTabs?: JSX.Element
  isArrow?: boolean
  countVisibleTabs?: number
  classNameLine?: string
}
