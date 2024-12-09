import { axiosInstance } from '@/shared'

export interface NotificationPayload {
  title: string
  content: string
  type: string
  secretKey: string
}

async function postNotification(storeId: string, body: NotificationPayload) {
  return axiosInstance.post(`/v1/stores/${storeId}/send-notification`, body)
}

export { postNotification }
