'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { TopBar, ButtonMobile } from '@eolluga/eolluga-ui'
import { PositionGroupType } from '@/shared/types/myPageTypes'
import PositionGroup from '@/features/mypage/ui/PositionGroup'
import BottomSheet from '@/features/mypage/ui/BottomSheet'
import { usePutPosition } from '@/features/mypage/model/usePutPosition'

export default function PositionWidget({
  storeId,
  data,
}: {
  storeId: string
  data: PositionGroupType[]
}) {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isModified, setIsModified] = useState(false)
  const { mutate } = usePutPosition()
  const [positionList, setPositionList] = useState<PositionGroupType[]>([])

  useEffect(() => {
    setPositionList(data)
  }, [data])

  const openBottomSheet = () => {
    setIsOpen(true)
  }
  const closeBottomSheet = () => {
    setIsOpen(false)
  }

  const handlePositionChange = useCallback((index: number, newPosition: string) => {
    setPositionList(prevList => {
      const updatedList = [...prevList]
      updatedList[index] = {
        ...updatedList[index],
        position: newPosition,
      }
      return updatedList
    })
    setIsModified(true)
  }, [])

  const addPosition = (newPosition: PositionGroupType) => {
    setPositionList(prevList => [...prevList, newPosition])
    setIsModified(true)
  }

  const deletePosition = (position: string) => {
    setPositionList(prevList => {
      let unassignedGroup = prevList.find(group => group.position === '미지정') as PositionGroupType
      const itemsToMove = prevList.find(group => group.position === position)?.items || []

      if (unassignedGroup) {
        // '미지정' 그룹이 이미 존재하는 경우, 삭제 대상 그룹의 아이템들을 미지정 그룹으로 이동
        unassignedGroup = {
          ...unassignedGroup,
          items: [...unassignedGroup.items, ...itemsToMove],
        }
        // 기존 리스트에서 삭제하려는 그룹을 제거하고, '미지정' 그룹을 업데이트하여 반환
        return prevList
          .filter(group => group.position !== position)
          .map(group => (group.position === '미지정' ? unassignedGroup : group))
      }
      // '미지정' 그룹이 없는 경우, 삭제 대상 그룹의 포지션을 '미지정'으로 변경
      return prevList.map(group =>
        group.position === position
          ? {
              ...group,
              position: '미지정',
            }
          : group,
      )
    })
    setIsModified(true)
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result
      if (!destination) return
      const updatedList = Array.from(positionList)

      const sourceGroup = updatedList.find(group => group.position === source.droppableId)
      const destinationGroup = updatedList.find(group => group.position === destination.droppableId)

      if (sourceGroup && destinationGroup) {
        const [movedItem] = sourceGroup.items.splice(source.index, 1)
        destinationGroup.items.splice(destination.index, 0, movedItem)
        if (source.droppableId !== destination.droppableId) {
          movedItem.position = destination.droppableId
        }
        setPositionList(updatedList)
        setIsModified(true)
      }
    },
    [positionList, storeId],
  )

  /* 저장을 눌렀을때 최종적으로 반영 */
  const updatePositions = async () => {
    // 현재 상태의 positionList와 props로 받아온 data를 비교하여 변경된 포지션만 업데이트
    const changedPositions = positionList.filter(group =>
      data.some(e => e.position !== group.position),
    )
    if (isModified && changedPositions.length > 0) {
      const updatePromises = changedPositions.flatMap(group =>
        group.items.map(item =>
          mutate({
            storeId,
            memberId: item.memberId,
            position: group.position,
          }),
        ),
      )

      await Promise.all(updatePromises)
      setIsModified(false)
    }
  }

  return (
    <main className="flex-grow pt-4">
      <TopBar
        leftIcon="chevron_left_outlined"
        title="근무자 직책 설정"
        onClickLeftIcon={() => push(`/${storeId}/mypage`)}
        rightText={isModified ? '저장' : ''}
        onClickRightText={updatePositions}
      />
      <div style={{ height: 'calc(100vh - 150px)' }} className="mt-4 overflow-y-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {positionList.length > 0 ? (
            positionList.map((group, index) => (
              <PositionGroup
                key={group.position}
                id={group.position}
                position={group.position}
                items={group.items}
                index={index}
                length={positionList.length}
              />
            ))
          ) : (
            <div
              style={{ height: 'calc(100vh - 200px)' }}
              className="flex justify-center items-center"
            >
              <p className="text-text-secondary">가게에 직원이 아직 없어요</p>
            </div>
          )}
        </DragDropContext>
      </div>
      <footer className="w-full py-3 px-4 fixed bottom-4">
        <ButtonMobile
          style="primary"
          size="L"
          type="text"
          state="enabled"
          text1="가게 직책 보기"
          onClick={openBottomSheet}
        />
      </footer>
      {isOpen && (
        <BottomSheet
          positionList={positionList}
          onAddPosition={addPosition}
          isOpen={isOpen}
          onChangePosition={handlePositionChange}
          onDeletePosition={deletePosition}
          closeBottomSheet={closeBottomSheet}
        />
      )}
    </main>
  )
}
