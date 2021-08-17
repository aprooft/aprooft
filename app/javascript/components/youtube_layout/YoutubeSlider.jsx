import { h, render, Fragment } from "preact";

export default function YoutubeSlider(props) {
    const data = props.data;

    // TODO
    return (
        <div>    
            <p>Slider</p>
            <p>{data.title}</p>
        </div>
    )
}