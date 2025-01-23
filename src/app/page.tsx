import Image from 'next/image'
import LoginButton from '@/widgets/join/ui/LoginButton'
import FlexBox from '@/shared/ui/Flexbox'
import { redirect } from 'next/navigation'
import { fetchUserInfo } from '@/entities'
import styles from './page.module.css'

export default async function Home() {
  const userInfo = await fetchUserInfo()
  if (userInfo && userInfo.storeList.length > 0) redirect(`/${userInfo.storeList[0].storeId}/home`)
  if (userInfo && userInfo.relationList.length > 0 && userInfo.relationList[0].storeId)
    redirect(`/${userInfo.relationList[0].storeId}/home`)

  return (
    <FlexBox
      direction="col"
      className="bg-black items-center w-full h-full justify-center pt-16 pb-spacing-08 gap-spacing-04 relative"
    >
      <div className={styles.titleAnimation}>
        <Image height={38} width={234} alt="text" src="/image/eollugage_title.png" />
      </div>
      <FlexBox direction="col" className={`${styles.bodyAnimation} justify-between w-full h-full`}>
        <div className="text-Gray-40 body-02-regular">간편하게 일하는 법</div>
        <div className={styles.backgroundImage} />
        <div className="w-full px-spacing-04">
          <LoginButton />
        </div>
      </FlexBox>
    </FlexBox>
  )
}
