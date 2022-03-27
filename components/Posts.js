import Post from "./Post";

import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, 'posts'), orderBy('timeStamp', 'desc')),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        [db]
    );

    return (
    <div>
        {posts.map(post => (
            <Post 
                key={post.id} 
                id={post.id} 
                username={post.data().username} 
                userImg={"Pic.jpg"}  
                img={post.data().image} 
                caption={post.data().caption} 
            />
        ))}
    </div>
    )
}

export default Posts
