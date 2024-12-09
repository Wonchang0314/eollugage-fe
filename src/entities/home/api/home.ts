interface OrderT {
  id: string
  storeId: string
  title: string
  content: string
  isClicked: boolean
}

interface DutyT {
  id: string
  memberId: string
  name: string
  position: string
  startTime: string
  endTime: string
}

export type { OrderT, DutyT }
