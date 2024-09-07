import { useMemo } from "react";
import { POSTS_QUERYResult } from "../../../sanity.types";
import { Link } from "../ui/link";
import { typographyVariants } from "../ui/typography";
import { formatDistanceToNow, format } from "date-fns";
import { IconAsText } from "../ui/icon-as-text";
import { Dot } from "lucide-react";
import { readingTime } from "reading-time-estimator";
import { PortableTextBlock, toPlainText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  blog: POSTS_QUERYResult[number];
};

export function BlogListItem({ blog }: Props) {
  const publishedDateDescription = useMemo(() => {
    const date = blog.publishedAt || blog._createdAt;
    try {
      return {
        actualDate: format(new Date(date), "MMMM dd, yyyy"),
        timeAgo: formatDistanceToNow(new Date(date)),
      };
    } catch (err) {
      return null;
    }
  }, [blog]);

  const readTime = readingTime(
    toPlainText(blog.body as unknown as PortableTextBlock),
    200,
  );

  return (
    <div className="py-4 flex gap-4">
      <div className="hidden md:block rounded h-fit overflow-hidden">
        {blog.mainImage && (
          <Image
            src={urlFor(blog.mainImage).width(100).height(62).url()}
            alt={blog.title || ""}
            width={100}
            height={62}
            placeholder="blur"
            blurDataURL={blog.mainImage.asset?.metadata?.lqip || ""}
          />
        )}
      </div>
      <div>
        <p className={typographyVariants({ as: "h3" })}>
          <Link href={`/blogs/${blog.slug?.current}`}>{blog.title}</Link>
        </p>
        <p className={cn(typographyVariants({ as: "muted" }), "leading-none")}>
          {publishedDateDescription && (
            <span>
              Published {publishedDateDescription?.actualDate} (
              {publishedDateDescription?.timeAgo} ago) <IconAsText icon={Dot} />{" "}
            </span>
          )}
          <span>{readTime.text}</span>
        </p>
        <div className="flex flex-wrap mt-2 gap-2">
          {blog.categories?.map((category) => (
            <Badge key={category.title} variant="secondary">
              {category.title}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
