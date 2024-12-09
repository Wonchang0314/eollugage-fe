import axios from 'axios'

async function getImageFromS3(presignedURL: string) {
  try {
    const response = await axios.get(presignedURL, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      },
    })
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    const imageURL = window.URL.createObjectURL(blob)

    return imageURL
  } catch (error) {
    if (axios.isAxiosError(error) && error.status === 404) console.log('no such key for image')
    else console.log('get image from S3 error', error)
    return ''
  }
}

export { getImageFromS3 }
