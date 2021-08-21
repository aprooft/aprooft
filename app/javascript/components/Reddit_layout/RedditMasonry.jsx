import { h, render, Fragment } from "preact";

export default function RedditMasonry(props) {
    const data = props.data
    
    // TODO
    return (  
        <div class="reddit-grid-masonry"> 
            { data.map( redditdata =>
                <p>{redditdata.thread_id}</p>
            )}
        </div>   
    )
}