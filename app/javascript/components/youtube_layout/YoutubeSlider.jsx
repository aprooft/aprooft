import { h, render, Fragment } from "preact";
import { Youtube } from 'preact-feather';

export default function YoutubeSlider(props) {
    const data = props.data;

    // TODO
    return (
        <div class="youtube-slider-wrapper">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <a href={`https://www.youtube.com/watch?v=${data[0].video_id}`} target='_blank'>
                            <img src={data[0].thumbnail} class="slider-img" />
                            <div class="slider-info-playicon">
                                <Youtube size={72} opacity={0.85} />
                            </div>
                        </a>
                    </div>
                    {data.slice(1).map(youtubedata =>
                        <div class="carousel-item">
                            <a href={`https://www.youtube.com/watch?v=${youtubedata.video_id}`} target='_blank'>
                                <img src={youtubedata.thumbnail} class="slider-img" />
                            </a>
                            <div class="grid-info-playicon">
                                <Youtube size={48} opacity={0.85} />
                            </div>
                        </div>
                    )}
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

