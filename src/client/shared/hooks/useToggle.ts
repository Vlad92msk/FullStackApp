import { useCallback, useState } from 'react'

export const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [open, setOpen] = useState(initialState)
  const handleToggle = useCallback((e?: any) => {
    e?.preventDefault()
    setOpen((prev) => !prev)
  }, [])

  return [open, handleToggle]
}
