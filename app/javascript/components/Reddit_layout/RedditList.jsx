import { h, render, Fragment } from "preact";
import { Youtube, Eye, ThumbsUp, ThumbsDown } from 'preact-feather';

export default function RedditGrid(props) {
    const data = props.data
    
    return (
        <div>
            { data.map( redditdata => 
                <div class="reddit-card-list">
                    <p>{redditdata.thread_id}</p>
                </div> 
            ) }
        </div>          
    )
}