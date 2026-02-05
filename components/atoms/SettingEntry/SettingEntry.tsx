import { ReactNode } from "react"

type SettingEntryProps = {
  children: ReactNode,
  title: string,
  description: ReactNode, // Can be a string with a link inside
}

const SettingEntry = ({ children, title, description }: SettingEntryProps) => {
  return (
    <div className="flex w-full justify-between items-center my-2">
      <div className="grow-2">
        <h3 className="font-bold text-sm opacity-80">{title}</h3>
        <p className="text-xs opacity-60">{description}</p>
      </div>
      <div className="grow-1 flex justify-end">
        {children}
      </div>
    </div>
  )
}

export default SettingEntry;
