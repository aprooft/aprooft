import { h, render, Fragment } from "preact";

export default function YoutubeSlider(props) {
    const data = props.data;

    // TODO
    return (
        <div class="youtube-slider-wrapper"> 
            { data.map( youtubedata =>
                <p>{youtubedata.title}</p>
            )}
        </div>  
    )
}