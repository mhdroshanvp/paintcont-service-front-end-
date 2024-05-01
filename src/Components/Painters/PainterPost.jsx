import React from "react";

function PainterPost({post}) {
  return (
    <>
      <div className="grid mt-5 rounded-[22px] bg-[#411c5e] xl:w-96 xl:h-96 sm:w-80 md:h-80 sm:h-80 m-5 flex items-center justify-center">
        <div>
          <h1>{post.painterId?.username}</h1>
        </div>
        <div className="border">
          <img className="size-52" src={post?.media} alt="Placeholder" />
        </div>
        <div>
          <h1>{post?.description}</h1>
        </div>
      </div>
    </>
  );
}

export default PainterPost;
