import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, removePost } from "../utils/savedPostsSlice";
import {
  BookmarkFillIcon,
  BookmarkIcon,
  CommentIcon,
  HeartFillIcon,
  HeartIcon,
  ShareIcon,
} from "../icons";
import "../styles/Post.css";

const Post = ({ id, caption, imageUrl, likes, profileImageUrl, username }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();

  return (
    <div className="post">
      <div className="post-profile">
        <div className="profile-image">
          <img src={profileImageUrl} />
        </div>
        <p>{username}</p>
      </div>
      <div className="post-image">
        <img src={imageUrl} />
      </div>
      <div className="post-stats">
        <div className="left-buttons">
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              isLiked
                ? setLikeCount(likeCount - 1)
                : setLikeCount(likeCount + 1);
            }}
          >
            {isLiked ? <HeartFillIcon /> : <HeartIcon />}
          </button>
          <button>
            <CommentIcon />
          </button>
          <button>
            <ShareIcon />
          </button>
        </div>
        <div className="right-buttons">
          <button
            onClick={() => {
              dispatch(
                isSaved
                  ? removePost(id)
                  : addPost({
                      id: id,
                      caption: caption,
                      imageUrl: imageUrl,
                      likes: likes,
                      profileImageUrl: profileImageUrl,
                      username: username,
                    })
              );
              setIsSaved(!isSaved);
            }}
          >
            {isSaved ? <BookmarkFillIcon /> : <BookmarkIcon />}
          </button>
        </div>
      </div>
      <div className="post-content">
        <div className="like-count">
          <p>{likeCount} likes</p>
        </div>
        <div className="post-caption">
          <h3>{username}</h3>
          <p>{caption}</p>
        </div>
      </div>
      <div className="comment-container">
        {comments?.map((comment, index) => (
          <div key={index} className="comment">
            <h3>{username}</h3>
            <p>{comment}</p>
          </div>
        ))}
      </div>
      <div className="post-comment-box">
        <input
          type="text"
          value={text}
          placeholder="Add a comment.."
          onChange={(e) => setText(e.target.value)}
        />
        {text && (
          <button
            onClick={() => {
              setComments([...comments, text]);
              setText("");
            }}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
