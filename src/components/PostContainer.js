import { useState, useEffect } from "react";
import Post from "./Post";
import { POSTS_API_URL } from "../utils/constants";

const PostContainer = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const response = await fetch(POSTS_API_URL);
    const json = await response.json();
    console.log(json);
    setPosts(json);
  }

  if (!posts) return null;

  return (
    <div className="post-container">
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            caption={post.alt_description}
            imageUrl={post.urls.regular}
            likes={post.likes}
            profileImageUrl={post.user.profile_image.large}
            username={post.user.username}
          />
        );
      })}
    </div>
  );
};

export default PostContainer;
