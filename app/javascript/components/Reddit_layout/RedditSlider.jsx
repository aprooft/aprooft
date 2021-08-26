import { h, render, Fragment } from "preact";

export default function RedditSlider(props) {
    const data = props.data;

    // TODO
    return (
        <div class="reddit-slider-wrapper">
            {data.map(redditdata =>
                <a href={`https://www.reddit.com/r/${redditdata.subreddit}/comments/${redditdata.thread_id}`} target="_blank">
                    <p>{redditdata.thread_id}</p>
                </a>
            )}
        </div>
    )
}