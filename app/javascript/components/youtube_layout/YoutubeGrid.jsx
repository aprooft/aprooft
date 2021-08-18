import { h, render, Fragment } from "preact";

export default function YoutubeGrid(props) {
    const data = props.data

    // TODO
    return (
        <div class="youtube-grid-wrapper">
            {data.map(youtubedata =>
                <div class="video-card-grid">
                    <div class="video-card-grid-thumbnail">
                        <div class="grid-info-thumbnail">
                            <img src={data.thumbnail} />
                        </div>
                        <div class="grid-info-playicon">
                            <i class="fas fa-play-circle"></i>
                        </div>
                    </div>
                    <div class="video-card-grid-info">
                        <div class="grid-info-title">
                            <div class="grid-info-title-insidebox">
                                {data.title}
                            </div>
                        </div>
                        <div class="grid-info-details">
                            <div class="grid-description">
                                {data.description}
                            </div>
                            <div class="grid-info-number">
                                <span><i class="fas fa-eye"></i> {data.view_count}</span>
                                <span><i class="fas fa-thumbs-up"></i> {data.like_count}</span>
                                <span><i class="fas fa-thumbs-down"></i> {data.dislike_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}