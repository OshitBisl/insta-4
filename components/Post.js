import { 
    SearchIcon, 
    PlusCircleIcon, 
    UserGroupIcon, 
    HeartIcon, 
    PaperAirplaneIcon, 
    MenuIcon,
    DotsHorizontalIcon,
    ChatIcon,
    BookmarkIcon,
    EmojiHappyIcon
} from "@heroicons/react/outline"

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { db } from "../firebase";

import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
    const { data: session } = useSession();
    const [ comment, setComment  ] = useState("");
    const [ comments, setComments ] = useState([]);

    const [ likes, setLikes ] = useState([]);
    const [ hasLiked, setHasLiked ] = useState(false);

    useEffect(
        () => 
            onSnapshot(
                query(
                    collection(db, "posts", id, 'comments'),
                    orderBy("timeStamp", "desc")
                ), 
                (snapshot) => {
                    setComments(snapshot.docs)
                }
            ), 
        [db, id]
    ),

    useEffect(
        () => 
            setHasLiked(
                likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1
            ),
        [likes]
    );

    useEffect(
        () => 
            onSnapshot(collection(db, 'posts', id, "likes"), snapshot => 
                setLikes(snapshot.docs)
            ), 
        [db, id]
    );

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        }   
        else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username,
            })
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timeStamp: serverTimestamp(),
        })
    }

    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}
                <div className="flex items-center p-5">
                    <img 
                        src={userImg} 
                        alt=":/"
                        className="rounded-full h-12 w-12 object-contain border p- mr-3"
                    />  
                    <p className="flex-1 font-bold  ">{username}</p>
                    <DotsHorizontalIcon className="h-5" />
                </div>

            {/* Img */}
                <img src={img} className="object-cover w-full" />

            {/* Buttons */}
                {session && (
                    <div className="flex justify-between px-4 pt-4">
                        <div className="flex space-x-4">
                            {
                                hasLiked ? (
                                    <HeartIconFilled onClick={likePost} className="Button text-red-500" />
                                ) : (
                                    <HeartIcon onClick={likePost} className="Button" />                                    
                                )
                            }
                            <ChatIcon className="Button" />
                            <PaperAirplaneIcon className="Button" />   
                        </div>

                        <BookmarkIcon className="Button" />
                    </div>
                )}
            {/* Caption */}
                <div>
                    <p className="p-5">
                        {likes.length > 0 && (
                            <p className="font-bold mb-1">{likes.length} likes</p>
                        )}

                        <span className="font-bold mr-1">{username} </span>
                        {caption}
                    </p>
                </div>

            {/* Comments */}
            {comments.length > 0 && (
                <div className="ml-10 h-[320px] overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map((comment) => (
                        <div 
                            key={comment.id} 
                            className="flex items-center space-x-2 mb-3"
                        >
                            <img 
                                className="h-7 rounded-full" 
                                src={comment.data().userImage}
                            />
                            <p className="text-sm flex-1">
                                <span className="font-bbold">
                                    {comment.data().username}
                                </span>{" "}
                                {comment.data().comment}
                            </p>

                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timeStamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Input Box */}
                {session && (
                    <form className="flex items-center p-4">
                        <EmojiHappyIcon className="h-7" />
                        <input 
                            type="text" 
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            className="border-none flex-1 focus:ring-0 outline-none" 
                            placeholder="Add a Comment"    
                        />
                        <button 
                            type="submit" 
                            disabled={!comment.trim()} 
                            onClick={sendComment}
                            className="font-semibold text-blue-400"
                        >
                            Post
                        </button>
                    </form>
                )}
        </div>
    )
}

export default Post