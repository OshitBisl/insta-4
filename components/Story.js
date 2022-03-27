function Story({ img, username }) {

    const name = "";

    return (
        <div>
            <img className="h-14 w-14 rounded-full p-{1.5px} border-red-500 border-2 cursor-pointer hover:scale-110 transition duration-200 ease-out"
            src={img} 
            alt={name}/>
            <p className="text-xs w-14 truncate text-center">{username}</p>
        </div>
    )
}

export default Story