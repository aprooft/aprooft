import { h, render, Fragment } from "preact";
import { Youtube, Eye, ThumbsUp, ThumbsDown } from 'preact-feather';

export default function YoutubeGrid(props) {
    const data = props.data

    // TODO
    return (
        <div class="youtube-grid-wrapper">
            {data.map(youtubedata =>
                <div class="video-card-grid">
                    <div class="video-card-grid-thumbnail">
                        <div class="grid-info-thumbnail">
                            <img src={youtubedata.thumbnail} />
                        </div>
                        <div class="grid-info-playicon">
                            {/* <i class="fas fa-play-circle"></i> */}
                            <Youtube size={48} opacity={0.85} />
                        </div>
                    </div>
                    <div class="video-card-grid-info">
                        <div class="grid-info-title">
                            <div class="grid-info-title-insidebox">
                                {youtubedata.title}
                            </div>
                        </div>
                        <div class="grid-info-details">
                            <div class="grid-info-number">
                                <span><Eye size={17} /> {youtubedata.view_count}</span>
                                <span><ThumbsUp size={17} /> {youtubedata.like_count}</span>
                                <span><ThumbsDown size={17} /> {youtubedata.dislike_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}