import { h, render, Fragment } from "preact";

export default function YoutubeGrid(props) {
    const data = props.data
    
    // TODO
    return (
        <div>  
            <p>Grid</p>
            <p>{data.title}</p>
        </div>     
    )
}