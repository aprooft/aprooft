import { h, render, Fragment } from "preact";
import If from './If';
import RedditGrid from './Reddit_layout/RedditGrid';
import RedditMasonry from './Reddit_layout/RedditMasonry';
import RedditSlider from './Reddit_layout/RedditSlider';
import RedditList from './Reddit_layout/RedditList';

export default function RedditPreview(props) {
    const data = props.data;

    return (
        <>
            <If condition={props.layout === 'list'} >
                <RedditList data={data} />
            </If>   
            <If condition={props.layout === 'grid'} >
                <RedditGrid data={data} />
            </If>  
            <If condition={props.layout === 'masonry'} >
                <RedditMasonry data={data} />
            </If>  
            <If condition={props.layout === 'slider'} >
                <RedditSlider data={data} />
            </If>  
        </>
    );
}
