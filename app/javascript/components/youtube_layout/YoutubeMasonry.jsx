import { h, render, Fragment } from "preact";

export default function YoutubeMasonry(props) {
    const data = props.data

    // TODO
    return (
        <div class="youtube-grid-masonry">
            {data.map(youtubedata =>
                <a href={`https://www.youtube.com/watch?v=${youtubedata.video_id}`} target='_blank'>
                    <p>{youtubedata.title}</p>
                </a>
            )}
        </div>
    )
}