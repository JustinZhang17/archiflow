// External Import 
import { ComponentPropsWithoutRef, SyntheticEvent } from "react";

type ThumbnailProps = ComponentPropsWithoutRef<'div'> & {
  url: string;
}

// TODO: Consider changing this to use next/image for better performance
const Thumbnail = ({ url, ...props }: ThumbnailProps) => {

  const setFallbackImage = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://placehold.co/300x300/png?text=Fallback+Thumbnail';
    event.currentTarget.onerror = null;
  }

  return (
    <div className="avatar pointer-events-none select-none" {...props}>
      <div className="w-18 rounded">
        <img src={url} alt="Thumbnail Image" onError={setFallbackImage} />
      </div>
    </div>
  );
}

export { Thumbnail };
