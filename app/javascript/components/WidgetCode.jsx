import { h, render, Fragment } from "preact";
import { useEffect, useState } from 'preact/hooks';
import If from './If'; 
import WidgetBox from "./WidgetBox";
import YoutubePreview from "../components/YoutubePreview";
import RedditPreview from "../components/RedditPreview";

function Widget(props) {
    const [show, setShow] = useState(true);
    let [tab, setTab] = useState("youtube");
    const widgetBoxClasses = show ? "widget-wrapper" : "widget-wrapper active";
    const dataApiUrl = window.location.href.replace("widgets", "api/v1/widgets").split('/').slice(0, -1).join('/')
    let [redditPreviewData, setRedditPreviewData] = useState([]);
    let [youtubePreviewData, setYoutubePreviewData] = useState([]);
    let [layout, setLayout] = useState("list");
    let [loading, setLoading] = useState(true);

    function finalWidgetData() {
        setLoading(true);
        fetch(dataApiUrl)
            .then(response => {
                response
                    .json()
                    .then(res => {
                        setYoutubePreviewData(res["youtubes"]);
                        setRedditPreviewData(res["reddits"]);
                        setLoading(false);
                    });
            })
    }

    useEffect(() => {
        finalWidgetData();
        // need comment out after storing jsonb styles in database
        window.setGlobalWidgetLayout = setLayout;
    }, []);

    return (
        <>
            <If condition = {show}>
                <div>
                    <button class="widget-button" onClick={() => setShow(false)}>Aprooft</button>
                </div>
            </If>  
            <div class={widgetBoxClasses}>
                <WidgetBox tab={tab} setTab={setTab} loading={false}>
                    <i class="fas fa-times close-icon" onClick={() => setShow(true)}></i>
                    <div class="preview-content">
                        <div class="content-dev">
                            <If condition={tab === "reddit"}>
                                <RedditPreview data={redditPreviewData}  layout={layout} />
                            </If>
                            <If condition={tab === "youtube"}>
                                <YoutubePreview data={youtubePreviewData} layout={layout} />
                            </If>
                        </div>
                    </div>
                </WidgetBox>
            </div>
        </>
    );
}

export default function WidgetCode(props) {
    return (
        <>    
            {/* <div class="widget-dev"> 
                <pre>
                    {`
                        () => {}...
                    `}
                </pre> 
            </div>    */}
            <Widget {...props}/>
        </>    
    )
}    