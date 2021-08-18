import { h, render, Fragment } from "preact";

export default function YoutubeMasonry(props) {
    const data = props.data
    
    // TODO
    return (  
        <div class="youtube-grid-masonry"> 
            { data.map( youtubedata =>
                <p>{youtubedata.title}</p>
            )}
        </div>   
    )
}