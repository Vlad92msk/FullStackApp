import React, { FC, useCallback, useEffect, useState } from 'react'
import { classnames } from '@bem-react/classnames'
import { makeCn } from '@shared/utils'
import styles from './HoneycombMesh.module.scss'

const cn = makeCn('HoneycombMesh', styles)

interface HoneycombMeshType {
  className?: string
  othersElements: JSX.Element
  column?: number
  row?: number
  isFirstInside?: boolean
  userElements: {
    position: number
    element: JSX.Element
  }[]
}

export const HoneycombMesh: FC<HoneycombMeshType> = React.memo((props) => {
  const { className, column, row, isFirstInside, userElements, othersElements } = props
  const [mesh, setMesh] = useState<number[][]>([])
  const [top, setTop] = useState<number[]>([])
  const [rowIndex, setRowIndex] = useState<number>(null)

  const createRow = useCallback((count: number, start: number) => {
    const array: number[] = []
    for (let i = start + 1; i < count + 1; i++) {
      array.push(i)
    }
    return array
  }, [])

  useEffect(() => {
    setMesh(() => {
      const array = createRow(row * column, 0)
      const size = column
      const subarray = []
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size)
      }
      return subarray
    })
  }, [row, column, createRow])

  useEffect(() => {
    setTop(
      [...mesh].reduce((acc, item, index) => {
        if (index === 0) {
          return [0]
        }
        if (index !== 0 && index % 2) {
          return [...acc, acc[index - 1] + 80]
        }
        return [...acc, acc[index - 1] + 35]
      }, [] as number[])
    )
  }, [mesh])

  /**
   * TODO: Сделать вариант ровной сетки и переключение на нее
   * TODO: Сделать настройку размеров ячеек
   * FIXME: Переименовать isFirstInside
   */
  return (
    <div className={classnames(cn(), className)}>
      {mesh.map((row, index) => (
        <div
          style={{ top: top[index], zIndex: rowIndex === index ? 3 : 2 }}
          className={cn('Row', {
            isFirstInside: isFirstInside && !!((index + 1) % 2),
            de: isFirstInside,
          })}
          onMouseEnter={() => setRowIndex(index)}
          onMouseLeave={() => setRowIndex(null)}
          key={'row' + index}
        >
          {row.map((i) => {
            const findElement = userElements.find(({ position }) => position === i)?.element
            return <div key={'icon' + i}>{findElement || othersElements}</div>
          })}
        </div>
      ))}
    </div>
  )
})

HoneycombMesh.defaultProps = {
  isFirstInside: true,
  column: 5,
  row: 5,
}
