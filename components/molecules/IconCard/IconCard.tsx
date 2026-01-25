// External Imports 
import { ComponentPropsWithoutRef } from "react";

// Internal Imports
import { Thumbnail } from "@/components/atoms/Thumbnail/Thumbnail"

type IconCardProps = ComponentPropsWithoutRef<'div'> & {
  name: string;
  tags: string[];
  url: string;
}

const IconCard = ({ name, tags, url, ...props }: IconCardProps) => {
  return (
    <div className="card bg-base-100 m-2 p-2 shadow-sm hover:active:bg-black text-xs" {...props}>
      <Thumbnail url={url} />
      <span className="select-none capitalize text-center mt-1">{name}</span>
    </div>
  );
}

export { IconCard };
