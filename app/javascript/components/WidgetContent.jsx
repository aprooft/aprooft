import { h, render, Fragment } from "preact";
import { useEffect, useState } from 'preact/hooks';
import If from './If'; 
import WidgetBox from "./WidgetBox";
import YoutubePreview from "../components/YoutubePreview";
import RedditPreview from "../components/RedditPreview";
import { XCircle } from 'preact-feather';

export default function WidgetContent({ url, widgetId }) {
    url = url || "";
    const [show, setShow] = useState(true);
    let [tab, setTab] = useState("youtube");
    const widgetBoxClasses = show ? "widget-wrapper" : "widget-wrapper active";
    const dataApiUrl = `${url}/api/v1/widgets/${widgetId}`;
    let [redditPreviewData, setRedditPreviewData] = useState([]);
    let [youtubePreviewData, setYoutubePreviewData] = useState([]);
    let [layout, setLayout] = useState("list");
    let [loading, setLoading] = useState(true);

    const closebtnstyles = {
        position: 'relative',
        top: '-91px',
        color: '#e2ebf1',
        fontSize: '20px',
        cursor: 'pointer',
      };
      

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
                    <div style="display:flex;justify-content:flex-end;margin-right:10px">
                        <span style={closebtnstyles}><XCircle size={22} opacity={0.8} onClick={() => setShow(true)} /></span>
                    </div>
                    <div class="preview-content" style="margin-top: -24px;">
                        <div class="content-dev" style="">
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