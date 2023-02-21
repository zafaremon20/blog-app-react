import { useNavigate } from "react-router-dom";

export default function SinglePost({ post }) {

  const { title, photoUrl, postText, author, postDate, id } = post;
  const navigate = useNavigate();
  const detailsPage = (id) => {
    navigate(`/blog/${id}`);
  }

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure className="h-64 overflow-hidden"><img className="w-full" src={photoUrl} alt="" /></figure>
      <div className='flex items-center gap-2 p-2'>
        <img className='rounded-full' width={30} height={30} src={author.authorImg} alt="" />
        <p className='flex flex-col text-sm flex-grow'>
          <span>Post Date : {postDate?.slice(0, 24)}</span>
          <span>Author : {author.name}</span>
        </p>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{postText.slice(0, 100)}</p>
        <div className="card-actions justify-end">
          <button className="btn" onClick={() => detailsPage(id)}>Read More &raquo;</button>
        </div>
      </div>
    </div>
  )
}
