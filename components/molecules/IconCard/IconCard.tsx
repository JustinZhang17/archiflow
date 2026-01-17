// Internal Imports
import { Thumbnail } from "@/components/atoms/Thumbnail/Thumbnail"

interface IconCardProps {
  name: string;
  tags: string[];
  url: string;
}

const IconCard = ({ name, tags, url }: IconCardProps) => {
  return (
    <div className="card bg-base-100 m-2  p-2 shadow-sm ">
      <Thumbnail url={url} />
      {name}
    </div>
  );
}

export { IconCard };
