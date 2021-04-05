import log  from "../../../modules/util/logUtil";
import Link from "next/link";

export default function index({ posts }) {
  return (
    <div>
      <h1>POST一覧</h1>
      <ul>
        {posts.map( post => {
          return <li key={post.id}><Link href={`/test/posts/${post.id}`}>{post.title}</Link></li>;
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  log.dbg("Server Side Props, Done!");

  const res   = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();

  return { props: { posts } };
}
