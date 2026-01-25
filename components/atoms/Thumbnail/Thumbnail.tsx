// External Import 
import { ComponentPropsWithoutRef } from "react";

type ThumbnailProps = ComponentPropsWithoutRef<'div'> & {
  url: string;
}

const Thumbnail = ({ url, ...props }: ThumbnailProps) => {
  return (
    <div className="avatar pointer-events-none select-none" {...props}>
      <div className="w-18 rounded">
        <img src={url} />
      </div>
    </div>
  );
}

export { Thumbnail };
