import { h, render, Fragment } from "preact";
import { Youtube, Eye, ThumbsUp, ThumbsDown, MessageSquare } from 'preact-feather';

export default function RedditGrid(props) {
    const data = props.data

    // TODO
    return (
        <div class="reddit-grid-wrapper">
            {data.map(redditdata =>
                <div class="reddit-card-grid">
                    <div class="reddit-card-grid-top">
                        <div class="reddit-grid-info-top">
                            <p class="reddit-grid-thread-title">{redditdata.thread_title}</p>
                        </div>
                    </div>
                    <div class="reddit-card-grid-bottom"></div>
                    <div class="reddit-grid-info">
                        <div class="upvotes-grid-wrapper">
                            <ThumbsUp />
                            <p>{redditdata.ups}</p>
                            <ThumbsDown />
                        </div>
                        <div class="reddit-grid-comments">
                            <MessageSquare />
                            <p>{redditdata.num_comments}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}