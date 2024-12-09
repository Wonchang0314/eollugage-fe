import { PositionGroupType, PositionItem } from '../types/myPageTypes'

function groupByPosition(initialPositions: PositionItem[]) {
  const groupedPositions: PositionGroupType[] = initialPositions.reduce<PositionGroupType[]>(
    (acc, item) => {
      const group = acc.find(g => g.position === item.position && g.position !== '사장님')
      if (group) {
        group.items.push(item)
      } else if (item.position !== '사장님' || acc.some(g => g.position === '사장님')) {
        acc.push({ position: item.position, items: [item] })
      }
      return acc
    },
    [],
  )
  return groupedPositions
}

export default groupByPosition
