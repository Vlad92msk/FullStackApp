import { useEffect, useState } from 'react'
import { concat, delay, interval, map } from 'rxjs'
import { scan, take } from 'rxjs/operators'

export interface WriteTextType {
  myText: string
  myDelay?: number
  speed?: number
  repeatCount: number
}

export const useWriteText = ({ myText, speed = 150, myDelay = 150, repeatCount = 0 }: WriteTextType) => {
  const [name, setName] = useState<string>('')

  const writeText$ = interval(speed).pipe(
    delay(myDelay),
    take(myText.length),
    scan((acc, v) => acc + myText[v], ''),
    map((createText) => createText.length === myText.length ? createText : createText + '|'),
  )

  const removeText$ = interval(speed).pipe(
    delay(myDelay),
    take(myText.length + 1),
    scan((acc, i) => acc.split('').filter((_, index) => index+1 <= myText.length - i).join(''), myText),
    map((createText) => createText.length > 0 ? createText + '|' : ''),
  )

  const repeatActionArray$ = new Array(repeatCount).fill([removeText$, writeText$]).flat(1)
  const text$ = concat(writeText$, ...repeatActionArray$)

  useEffect(() => {
    const createText = text$.subscribe(setName)
    return () => createText.unsubscribe()
  }, [])

  return name;
};
