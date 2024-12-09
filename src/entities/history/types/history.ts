export interface History {
  id: number
  date: string
  day: string
  startTime: string
  endTime: string | null
}

export interface Histories {
  storeId: string
  memberId: string | null
  type: 'WEEKLY' | 'MONTHLY'
  year: number
  month: number
  weekOfMonth?: number
  histories: History[]
}
