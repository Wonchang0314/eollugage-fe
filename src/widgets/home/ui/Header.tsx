interface HeaderProps {
  title: string
  storeCode: string
}

export default function Header({ title, storeCode }: HeaderProps) {
  return (
    <div className="w-full fixed top-0 bg-black text-white pt-6 pl-4 pb-4 flex gap-2">
      <div className="body-03-bold-compact">{title}</div>
      <div className="body-03-regular-compact">({storeCode})</div>
    </div>
  )
}
