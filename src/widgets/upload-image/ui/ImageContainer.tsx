import { Flexbox } from '@/shared'
import { Icon } from '@eolluga/eolluga-ui'
import Image from 'next/image'
import { OrbitProgress } from 'react-loading-indicators'
import storeDefaultImage from '@public/image/store_default_image.png'
import { StoreInfoT } from '@/entities'
import useHandleStoreImage from '../model/useHandleStoreImage'

interface ImageContainerProps {
  isLoading: boolean
  page: 'home' | 'join'
  storeInfo: undefined | StoreInfoT // has imageFileName
  imageData: undefined | string // blob link
}

export default function ImageContainer({
  isLoading,
  page,
  storeInfo,
  imageData,
}: ImageContainerProps) {
  const { onImageLoadComplete } = useHandleStoreImage()

  const noStoreImage =
    (storeInfo?.image === 'NONE' || imageData === undefined || imageData.length === 0) && !isLoading

  const isImageValid =
    storeInfo?.image !== 'NONE' && imageData !== undefined && imageData.length > 0

  return (
    <Flexbox direction="col" className={`w-full gap-spacing-03 ${page === 'join' && 'mt-12'}`}>
      <div className="w-full aspect-[3/2] max-h-[400px] relative overflow-hidden bg-layer-01">
        {noStoreImage && (
          <Image
            alt="store default image"
            src={storeDefaultImage}
            style={{ objectFit: 'contain', width: '100%' }}
            onLoad={onImageLoadComplete}
          />
        )}
        {isImageValid && (
          <Image
            alt="store image"
            src={imageData}
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            fill
            onLoad={onImageLoadComplete}
          />
        )}
        {isLoading && (
          <Flexbox className="absolute bg-layer-01 inset-0 justify-center">
            <OrbitProgress color="#fff" size="small" text="" textColor="" />
          </Flexbox>
        )}
      </div>
      <Flexbox className="items-start w-full gap-spacing-04">
        <Icon icon="info_circle_filled" size={20} className="fill-support-info shrink-0" />
        <div className="w-full body-01-medium text-text-helper">
          예시처럼 매장의 전체 공간이 보이는 사진을 선택해주세요.
          <br />
          손님들이 있는 사진보다 손님들이 없는 사진을 선택해주세요.
        </div>
      </Flexbox>
    </Flexbox>
  )
}
