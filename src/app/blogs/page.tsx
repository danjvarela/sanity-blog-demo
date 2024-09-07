import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { POSTS_QUERYResult } from "../../../sanity.types";
import { BlogListItem } from "@/components/blogs/blog-list-item";
import { H1, P } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";
import { IconAsText } from "@/components/ui/icon-as-text";
import { ArrowLeft } from "lucide-react";

export default async function BlogsPage() {
  const blogs = await sanityFetch<POSTS_QUERYResult>({
    query: POSTS_QUERY,
  });

  return (
    <>
      <P>
        <Link href="/">
          <IconAsText icon={ArrowLeft} /> Back to homepage
        </Link>
      </P>

      <H1>Blogs</H1>

      <div className="divide-y mt-6">
        {blogs.map((blog) => (
          <BlogListItem blog={blog} key={blog._id} />
        ))}
      </div>
    </>
  );
}
