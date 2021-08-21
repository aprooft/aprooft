import { h, render, Fragment } from "preact";

export default function RedditGrid(props) {
    const data = props.data
    
    // TODO
    return (
        <div class="reddit-grid-wrapper"> 
            { data.map( redditdata =>
                <p>{redditdata.thread_id}</p>
            )}
        </div>     
    )
}