import { h, render, Fragment } from "preact";
import If from './If';
import YoutubeGrid from './youtube_layout/YoutubeGrid';
import YoutubeMasonry from './youtube_layout/YoutubeMasonry';
import YoutubeSlider from './youtube_layout/YoutubeSlider';
import YoutubeList from './youtube_layout/YoutubeList';

export default function YoutubePreview(props) {
    const data = props.data;

    return (
        <>
            <If condition={props.layout === 'list'} >
                <YoutubeList data={data} />
            </If>   
            <If condition={props.layout === 'grid'} >
                <YoutubeGrid data={data} />
            </If>  
            <If condition={props.layout === 'masonry'} >
                <YoutubeMasonry data={data} />
            </If>  
            <If condition={props.layout === 'slider'} >
                <YoutubeSlider data={data} />
            </If>  
        </>
    );
}
