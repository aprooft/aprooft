import { h, render, Fragment } from "preact";

export default function RedditSlider(props) {
    const data = props.data;

    // TODO
    return (
        <div class="reddit-slider-wrapper"> 
            { data.map( redditdata =>
                <p>{redditdata.thread_id}</p>
            )}
        </div>  
    )
}