import { useState, useEffect } from "react";
import Post from "./Post";
import { POSTS_API_URL } from "../utils/constants";
import "../styles/PostContainer.css";

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { v4 } from "uuid";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const firestore = getFirestore(app);
const storage = getStorage();

const PostContainer = () => {
  const [posts, setPosts] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const [data, setData] = useState([]);

  const username = useSelector((store) => store.user.username);

  const navigate = useNavigate();

  const handlePhotoUpload = async () => {
    if (photo) {
      const storageRef = ref(storage, `photos/${photo.name + v4()}`);
      await uploadBytes(storageRef, photo);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(firestore, "posts"), {
        caption: caption,
        imageUrl: url,
        likes: 0,
        username: username,
      });
    }
  };

  const fetchDataFromFirestore = () => {
    const photosCollection = collection(firestore, "posts");
    const unsubscribe = onSnapshot(photosCollection, (querySnapshot) => {
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    });

    return unsubscribe;
  };

  async function getPosts() {
    const response = await fetch(POSTS_API_URL);
    const json = await response.json();
    setPosts(json);
  }

  useEffect(() => {
    getPosts();

    const unsubscribe = fetchDataFromFirestore();

    return () => unsubscribe();
  }, []);

  if (!posts) return null;

  return (
    <div className="post-container">
      <div className="create-post">
        <input
          type="file"
          onChange={(e) => {
            setPhoto(e.target.files[0]);
          }}
          required
        />
        <input
          type="text"
          placeholder="caption.."
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          required
        />
        <button
          onClick={() => {
            if (username) {
              handlePhotoUpload();
            } else {
              navigate("/login");
            }
          }}
        >
          Share
        </button>
      </div>

      {data?.map((post, index) => {
        return (
          <Post
            key={index}
            caption={post.caption}
            imageUrl={post.imageUrl}
            likes={post.likes}
            username={post.username}
          />
        );
      })}

      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
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
