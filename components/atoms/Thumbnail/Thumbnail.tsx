
interface ThumbnailProps {
  url: string;
  [key: string]: any; // HACK: Check if this is good practice for passing additional props
}

const Thumbnail = ({ url, ...props }: ThumbnailProps) => {
  return (
    <div className="avatar {...props}">
      <div className="w-24 rounded">
        <img src={url} />
      </div>
    </div>
  );
}

export { Thumbnail };
