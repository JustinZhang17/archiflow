import { ReactNode } from "react"

type SettingTitleProps = {
  children: ReactNode,
}

const SettingTitle = ({ children }: SettingTitleProps) => {
  return (
    <h3 className="font-bold text-lg divider-start divider">{children}</h3>
  )
}

export default SettingTitle;
