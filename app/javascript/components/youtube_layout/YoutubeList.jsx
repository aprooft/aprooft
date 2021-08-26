import { h, render, Fragment } from "preact";
import { Youtube, Eye, ThumbsUp, ThumbsDown } from 'preact-feather';

export default function YoutubeGrid(props) {
    const data = props.data

    return (
        <div class="youtube-list-wrapper">
            {data.map(youtubedata =>
                <a href={`https://www.youtube.com/watch?v=${youtubedata.video_id}`} target='_blank'>
                    <div class="video-card-list">
                        <div class="video-card-list-thumbnail">
                            <div class="list-info-thumbnail">
                                <img src={youtubedata.thumbnail} />
                            </div>
                            <div class="list-info-playicon">
                                <Youtube size={48} opacity={0.85} />
                            </div>
                        </div>
                        <div class="video-card-list-info">
                            <div class="list-info-title">
                                <div class="list-info-title-insidebox">
                                    {youtubedata.title}
                                </div>
                            </div>
                            <div class="list-info-details">
                                <span class="list-info-channel">
                                    <img src={youtubedata.channel_pic} />
                                    <span>{youtubedata.channel_name}</span>
                                </span>
                                <div class="list-info-number">
                                    <span><Eye size={17} /> {youtubedata.view_count}</span>
                                    <span><ThumbsUp size={17} /> {youtubedata.like_count}</span>
                                    <span><ThumbsDown size={17} /> {youtubedata.dislike_count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            )}
        </div>
    )
}