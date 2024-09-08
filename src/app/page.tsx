import { H1, P } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";

export default function Home() {
  return (
    <>
      <H1>Home</H1>
      <P>
        This is a sample site to demonstrate how to create a personal blog using
        Sanity and Next.js.
      </P>
      <P>
        <Link href="/blogs">Go to the blogs section</Link>
      </P>
      <P>
        <Link href="https://www.danvarela.com/blogs/creating-a-personal-blog-with-next-js-and-sanity-setting-up-sanity">
          Visit my guide on how to create a personal blog using Sanity and
          Next.js
        </Link>
      </P>
    </>
  );
}
