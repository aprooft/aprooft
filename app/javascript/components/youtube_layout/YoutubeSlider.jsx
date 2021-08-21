import { h, render, Fragment } from "preact";

export default function YoutubeSlider(props) {
    const data = props.data;

    // TODO
    return (
        <div class="youtube-slider-wrapper">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={data[0].thumbnail} class="slider-img" />
                    </div>
                    {data.slice(1).map(youtubedata =>
                        <div class="carousel-item">
                            <img src={youtubedata.thumbnail} class="slider-img" />
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

