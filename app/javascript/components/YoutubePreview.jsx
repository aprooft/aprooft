import { h, render, Fragment } from "preact";
import If from './If';

export default function YoutubePreview(props) {
    const data = props.data;

    return (
        <>
            <If condition={props.layout === 'list'} >
                <div class="video-card-list">
                    <div class="video-card-list-thumbnail">
                        <div class="list-info-thumbnail">
                            <img src={data.thumbnail} />
                        </div>
                        <div class="list-info-playicon">
                            <i class="fas fa-play-circle"></i>
                        </div>
                    </div>
                    <div class="video-card-list-info">
                        <div class="list-info-title">
                            <div class="list-info-title-insidebox">
                                {data.title}
                            </div>
                        </div>
                        <div class="list-info-details">
                            <span class="list-info-channel">
                                <img src={data.channel_pic} />
                                <span>{data.channel_name}</span>
                            </span>
                            <div class="list-info-number">
                                <span><i class="fas fa-eye"></i> {data.view_count}</span>
                                <span><i class="fas fa-thumbs-up"></i> {data.like_count}</span>
                                <span><i class="fas fa-thumbs-down"></i> {data.dislike_count}</span>
                            </div>
                        </div>
                    </div>
                </div> 
            </If>   
            <If condition={props.layout === 'grid'} >
                <p>coming soon</p>
            </If>  
            <If condition={props.layout === 'masonry'} >
                <p>coming soon</p>
            </If>  
            <If condition={props.layout === 'slider'} >
                <p>coming soon</p>
            </If>  
        </>
    );
}
