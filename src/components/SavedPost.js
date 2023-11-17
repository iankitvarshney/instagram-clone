import "../styles/SavedPost.css";

const SavedPost = ({
  id,
  caption,
  imageUrl,
  likes,
  profileImageUrl,
  username,
}) => {
  return (
    <div className="saved-post">
      <div className="post-image">
        <img src={imageUrl} />
      </div>
    </div>
  );
};

export default SavedPost;
