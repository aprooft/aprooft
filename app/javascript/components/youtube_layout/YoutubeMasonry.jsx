import { h, render, Fragment } from "preact";

export default function YoutubeMasonry(props) {
    const data = props.data
    
    // TODO
    return (  
        <div>
            <p>Masonry</p>
            <p>{data.title}</p>
        </div>      
    )
}