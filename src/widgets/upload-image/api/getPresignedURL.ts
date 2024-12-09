'use server'

import axios from 'axios'

export async function getPresignedUrl(fileFullName: string): Promise<string> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRESIGNED_URL_SERVER}?name=${fileFullName}&method=get`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    )
    return res.data.presigned_url
  } catch (error) {
    return ''
  }
}
