'use client'

/* eslint-disable import/no-cycle */
import { useEffect } from 'react'
import FlexBox from '@/shared/ui/Flexbox'
import { useRouter } from 'next/navigation'
import { TopBar } from '@eolluga/eolluga-ui'
import { useAtom } from 'jotai'
import { useGetStoreInfo } from '@/entities'
import { sendRNFunction } from '@/shared'
import { useGetStoreImage } from '../model/useGetStoreImage'
import { useGetPresignedURL } from '../model/useGetPresignedURL'
import { imageNameAtom, isImageLoadingAtom } from '../atoms/uploadImageAtoms'
import ImageTitle from './ImageTitle'
import ImageContainer from './ImageContainer'
import ImageControlButtons from './ImageControlButtons'

interface ImageUploadScreenProps {
  page: 'home' | 'join'
  storeId: string
  initialImageName?: string
}

export default function ImageUploadClient({
  page,
  storeId,
  initialImageName,
}: ImageUploadScreenProps) {
  const [imageName, setImageName] = useAtom(imageNameAtom)
  const [isLoading] = useAtom(isImageLoadingAtom)

  const router = useRouter()
  const { data: presignedURL } = useGetPresignedURL(storeId, imageName)
  const { data: storeInfo } = useGetStoreInfo(storeId)
  // prettier-ignore
  const { data: imageInfo, isLoading: isLoadingImage } = useGetStoreImage( storeId, presignedURL, imageName )

  const onClickBackButton = () => {
    if (page === 'home') router.replace(`/${storeId}/home`)
    else router.replace('/join')
  }

  useEffect(() => {
    sendRNFunction('setStatusbarStyle', { color: '#FFF', style: 'dark' })
    if (initialImageName) setImageName(initialImageName)
  }, [])

  return (
    <FlexBox direction="col" className="w-full h-full">
      <TopBar
        leftIcon="chevron_left_outlined"
        title={page === 'home' ? '가게 대표 사진 추가' : ''}
        onClickLeftIcon={onClickBackButton}
      />
      <FlexBox
        direction="col"
        className="w-full h-full px-spacing-04 pt-spacing-06 justify-between"
      >
        <FlexBox direction="col" className="w-full">
          {page === 'join' && <ImageTitle />}
          <ImageContainer
            isLoading={isLoading || isLoadingImage}
            page={page}
            storeInfo={storeInfo}
            imageData={imageInfo}
          />
        </FlexBox>
      </FlexBox>
      <ImageControlButtons
        page={page}
        storeId={storeId}
        imageInfo={storeInfo?.image}
        storeInfo={storeInfo}
      />
    </FlexBox>
  )
}
