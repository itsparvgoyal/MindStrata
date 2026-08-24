const HightlightText = ({text}) => {
    return (
        <span className="text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text font-extrabold">
            {" "}
            {text}
            {" "}
        </span>
    )
}

export default HightlightText;