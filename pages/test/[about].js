import { useRouter } from "next/router";
import Link from "next/link";

export default function About() {
  const router = useRouter();

  // <HOST>:<PORT>/test/abc?param1=one 
  // Display pagename => abc & Query String => one
  return (
    <>
      <h1>{router.query.about} Page, Query "param1" = {router.query.param1}</h1>
      {/* ページのリロードなしでリンク先に遷移する */}
      <Link href="/">TOP</Link>
    </>
  );
}
