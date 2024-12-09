'use server'

/* eslint-disable import/no-cycle */

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import ImageUploadClient from './UploadImageClient'
import { getPresignedUrl } from '../api/getPresignedURL'

interface ImageUploadScreenProps {
  page: 'join' | 'home'
  storeId: string
  initialImageName?: string
}

export default async function ImageUploadScreen({
  page,
  storeId,
  initialImageName,
}: ImageUploadScreenProps) {
  const queryClient = new QueryClient()
  if (initialImageName) {
    await queryClient.prefetchQuery({
      queryKey: ['getPresignedURL', storeId, initialImageName],
      queryFn: () => getPresignedUrl(initialImageName),
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ImageUploadClient page={page} storeId={storeId} initialImageName={initialImageName} />
    </HydrationBoundary>
  )
}
