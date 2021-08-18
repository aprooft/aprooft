import { h, render, Fragment } from "preact";

export default function YoutubeGrid(props) {
    const data = props.data
    
    // TODO
    return (
        <div class="youtube-grid-wrapper"> 
            { data.map( youtubedata =>
                <p>{youtubedata.title}</p>
            )}
        </div>     
    )
}