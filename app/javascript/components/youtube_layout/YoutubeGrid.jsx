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
                            <img src={youtubedata.thumbnail} />
                        </div>
                        <div class="grid-info-playicon">
                            <i class="fas fa-play-circle"></i>
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
                                <span><i class="fas fa-eye"></i> <p>{youtubedata.view_count}</p></span>
                                <span><i class="fas fa-thumbs-up"></i><p>{youtubedata.like_count}</p></span>
                                <span><i class="fas fa-thumbs-down"></i><p>{youtubedata.dislike_count}</p></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}