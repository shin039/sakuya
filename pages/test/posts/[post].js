import log  from "../../../modules/util/logUtil";

export default function post({ post }){

  return (
    <div>
      <h1>POST(投稿){post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  log.dbg("Server Side Props,post, Done!");

  const id   = params.post;
  const res  = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return { props: { post } };
}
