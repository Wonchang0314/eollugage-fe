import { getStoreInfo } from '@/entities/store/api/getStoreInfo'
import ImageUploadScreen from '@/widgets/upload-image/ui/UploadImageScreen'

interface JoinUploadImagePageProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function JoinUploadImagePage({ searchParams }: JoinUploadImagePageProps) {
  const { storeId } = searchParams
  const { image } = await getStoreInfo(storeId)

  return <ImageUploadScreen page="join" storeId={storeId} initialImageName={image} />
}
