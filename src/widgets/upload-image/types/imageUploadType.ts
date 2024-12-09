interface ImageUploadResultT {
  isSuccess: boolean
  reason?: UploadFailReasonT
  fileFullName?: string
}

type UploadFailReasonT = 'upload-fail' | 'not-select' | 'presigned-url-error'

export { type ImageUploadResultT, type UploadFailReasonT }
