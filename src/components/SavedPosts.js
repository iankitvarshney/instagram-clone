import { useSelector } from "react-redux";
import SavedPost from "./SavedPost";
import "../styles/SavedPosts.css";

const SavedPosts = () => {
  const posts = useSelector((store) => store.savedPosts.posts);

  return (
    <div className="saved-posts">
      {posts.map((post) => (
        <SavedPost {...post} />
      ))}
    </div>
  );
};

export default SavedPosts;
