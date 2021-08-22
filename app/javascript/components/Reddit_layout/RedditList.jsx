import { h, render, Fragment } from "preact";
import { Youtube, Eye, ThumbsUp, ThumbsDown, MessageSquare } from 'preact-feather';

export default function RedditGrid(props) {
    const data = props.data

    return (
        <div class="reddit-list-wrapper">
            {data.map(redditdata =>
                <a href={`https://www.reddit.com/r/${redditdata.subreddit}/comments/${redditdata.thread_id}`} target="_blank">
                    <div class="reddit-card-list">
                        <div class="reddit-card-list-left">
                            <div class="upvotes-list-wrapper">
                                <ThumbsUp />
                                <p>{redditdata.ups}</p>
                                <ThumbsDown />
                            </div>
                        </div>
                        <div class="reddit-card-list-right"></div>
                        <div class="reddit-list-info">
                            <div class="reddit-list-info-top">
                                <p class="subreddit-list"><span>r/{redditdata.subreddit}</span> · Posted by u/{redditdata.author} {redditdata.created} ago</p>
                                <p class="reddit-list-thread-title">{redditdata.thread_title}</p>
                            </div>
                            <div class="reddit-list-comments">
                                <MessageSquare />
                                <p>{redditdata.num_comments}</p>
                            </div>
                        </div>
                    </div>
                </a>
            )}
        </div>
    )
}