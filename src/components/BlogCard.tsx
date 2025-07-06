import { useRouter } from "next/navigation";
import Image from "next/image";

interface BlogCardProps {
  imgUrl: string;
  author?: string;
  date?: string;
  title: string;
  blogUrl: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imgUrl,
  author = "N/A",
  date = "",
  title,
  blogUrl,
}) => {
  const router = useRouter();

  // Format the incoming date
  const formattedDate = (() => {
    if (!date) return "";
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  })();

  const handleClick = () => {
    router.push(`/blogs/${blogUrl}`);
  };

  return (
    <div className="tw-py-8 tw-px-2">
      <div
        className="tw-flex tw-flex-col tw-items-center tw-group tw-overflow-hidden lg:tw-w-[22rem] tw-w-[18rem] tw-cursor-pointer tw-bg-white tw-rounded-2xl hover:tw-scale-[1.01] hover:tw-shadow-xl tw-transition-all"
        onClick={handleClick}
      >
        <div className="tw-rounded-2xl tw-w-full lg:tw-h-[16rem] tw-h-[12rem] relative">
          <Image
            src={imgUrl}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 22rem"
            priority={false}
          />
        </div>
        <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4 tw-w-full tw-items-center">
          <div className="tw-w-full tw-h-[1px] tw-bg-SmallHeading tw-rounded-full"></div>
          <div className="tw-flex tw-justify-between tw-w-full tw-items-center">
            <div className="tw-text-BluePrimary tw-font-semibold tw-transition-all tw-line-clamp-1 tw-text-ellipsis tw-text-sm tw-px-3 tw-py-1 tw-bg-BGColors tw-rounded-full">
              {author}
            </div>
          </div>
          <div className="tw-w-full tw-line-clamp-2 tw-text-ellipsis tw-font-bold tw-h-12">
            {title}
          </div>
          <div className="tw-text-SmallHeading tw-font-semibold tw-w-full group-hover:tw-text-black hover:!tw-text-BluePrimary tw-transition-all">
            Read more...
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
