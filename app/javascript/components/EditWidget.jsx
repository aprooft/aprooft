import { h, render, Fragment } from "preact";
import { useEffect, useState } from 'preact/hooks';
import TopBar from "../components/TopBar";
import If from "../components/If";
import YoutubePreview from "../components/YoutubePreview";
import RedditPreview from "../components/RedditPreview";
import InputBox from "../components/InputBox";
import WidgetCode from "../components/WidgetCode";
import WidgetBox from "./WidgetBox";
import { PlusCircle, SkipBack, X } from "preact-feather";


export default function EditWidget() {
    let [redditPreviewData, setRedditPreviewData] = useState([]);
    let [youtubePreviewData, setYoutubePreviewData] = useState([]);
    let [display, setDisplay] = useState("forms");
    let [youtubeData, setYoutubeData] = useState([""]);
    let [redditData, setRedditData] = useState([""]);
    let [loading, setLoading] = useState(true);
    let [tab, setTab] = useState("youtube");
    let [layout, setLayout] = useState("list");

    const formUrl = window.location.href.split("/").slice(0, -1).join("/");
    const widgetId = parseInt(window.location.href.split("/").slice(-2, -1)[0], 10);
    const dataApiUrl = window.location.href.replace("widgets", "api/v1/widgets").split('/').slice(0, -1).join('/')

    function existData() {
        setLoading(true);
        fetch(dataApiUrl)
            .then(response => {
                response
                    .json()
                    .then(res => {
                        let ytUrls = res["youtubes"].map(youtube => "https://www.youtube.com/watch?v=" + youtube.video_id)
                        setYoutubePreviewData(res["youtubes"]);
                        setYoutubeData(ytUrls);

                        let rUrls = res["reddits"].map(reddit => "https://www.reddit.com/comments/" + reddit.thread_id);
                        setRedditPreviewData(res["reddits"]);
                        setRedditData(rUrls);

                        if ((tab === "youtube" && ytUrls.length > 0) ||
                            (tab === "reddit" && rUrls.length > 0)) {
                            setDisplay("preview");
                        }

                        setLoading(false);
                    });
            })
    }

    // Run existData when this component is created
    useEffect(() => {
        // console.log(widgetId);
        existData();
        window.setGlobalWidgetLayout = setLayout;
    }, []);

    function preview() {
        setLoading(true);
        let input = document.querySelectorAll('.youtube-hidden-link');
        let youtubeUrls = [];
        for (let i of input) {
            youtubeUrls.push(i.value);
        }

        input = document.querySelectorAll('.reddit-hidden-link');
        let redditUrls = [];
        for (let i of input) {
            redditUrls.push(i.value);
        }

        fetch(formUrl + '/preview', {
            method: 'POST',
            body: JSON.stringify({
                "youtube_links": youtubeUrls,
                "reddit_links": redditUrls,
            }),
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors',
        }).then(response => {
            response
                .json()
                .then(res => {
                    setYoutubePreviewData(res["youtubes"]);
                    setRedditPreviewData(res["reddits"]);
                    setDisplay("preview");
                    setLoading(false);
                }
                );
        })
    }

    function onInputChange(tab, i, e) {
        if (tab === "youtube") {
            // copy the youtubeData array
            let ytData = youtubeData.slice();
            ytData[i] = e.target.value;

            setYoutubeData(ytData);
        } else if (tab === "reddit") {
            // copy the redditData array
            let rData = redditData.slice();
            rData[i] = e.target.value;

            setRedditData(rData);
        }
    }

    function addInputBox() {
        if (tab === "youtube") {
            let data = youtubeData.slice();
            data.push("");
            setYoutubeData(data);
            setTimeout(() => {
                const links = document.querySelectorAll(".youtube-link");
                links[links.length - 1] && links[links.length - 1].focus();
            }, 100);
        } else if (tab === "reddit") {
            let data = redditData.slice();
            data.push("");
            setRedditData(data);
            setTimeout(() => {
                const links = document.querySelectorAll(".reddit-link");
                links[links.length - 1] && links[links.length - 1].focus();
            }, 100);
        }
    }

    function removeInputBox(e) {
        console.log("test works")
        console.log(e)
        e.currentTarget.parentNode.remove();
    }

    return (
        <>
            <If condition={display === "generate"}>
                <div class="go-back" onClick={() => { setDisplay("preview") }}>
                    <SkipBack /><span>Back</span>
                </div>
                <WidgetCode widgetId={widgetId} tab={tab} setTab={setTab} />
                {/* <input type="button" class="back-button" value="Back" onClick={() => { setDisplay("preview") }} /> */}
            </If>
            <If condition={display != "generate"}>
                <div class="edit-widget-wrapper">
                    <form action={formUrl} method="POST">
                        <WidgetBox tab={tab} setTab={setTab} loading={loading}>
                            <If condition={display === "forms"}>
                                <div class="edit-content">
                                    <div class="content-dev">
                                        <If condition={tab === "reddit"}>
                                            {redditData.map((url, i) =>
                                                <div class="input-links-wrapper">
                                                    <InputBox key={i} tab={tab} value={url} onPreview={preview} onChange={(e) => onInputChange(tab, i, e)} />
                                                    <X size={32} stroke-width={2} onClick={(e) => removeInputBox(e)} />
                                                </div>
                                            )}
                                        </If>
                                        <If condition={tab === "youtube"}>
                                            {youtubeData.map((url, i) =>
                                                <div class="input-links-wrapper">
                                                    <InputBox key={i} tab={tab} value={url} onPreview={preview} onChange={(e) => onInputChange(tab, i, e)} />
                                                    <X size={32} stroke-width={2} onClick={(e) => removeInputBox(e)} />
                                                </div>
                                            )}
                                        </If>
                                    </div>
                                    <div class="add-input-dev" onClick={addInputBox}>
                                        <div class="plus-box">
                                            <PlusCircle size={40} stroke-width={2} />
                                        </div>
                                    </div>
                                </div>
                            </If>
                            <If condition={display === "preview"}>
                                <div class="preview-content">
                                    <div class="content-dev">
                                        <If condition={tab === "reddit"}>
                                            <RedditPreview data={redditPreviewData} layout={layout} />
                                        </If>
                                        <If condition={tab === "youtube"}>
                                            <YoutubePreview data={youtubePreviewData} layout={layout} />
                                        </If>
                                    </div>
                                </div>
                            </If>
                        </WidgetBox>
                        <div class="d-none">
                            {youtubeData.map((url, i) => <input key={i} type="hidden" class="youtube-hidden-link" name="youtube-link[]" value={url} />)}
                            {redditData.map((url, i) => <input key={i} type="hidden" class="reddit-hidden-link" name="reddit-link[]" value={url} />)}
                        </div>
                        <div class="mt-4">
                            <If condition={display === "forms"}>
                                <div class="submit-dev">
                                    <input type="button" class="submit-dev-btn" value="Preview" onClick={preview} />
                                </div>
                            </If>
                            <If condition={display === "preview"}>
                                <div class="submit-dev">
                                    <input type="button" class="submit-dev-btn" value="Edit" onClick={() => { setDisplay("forms") }} />
                                    <input type="hidden" name="_method" value="PATCH" />
                                    <input type="submit" class="submit-dev-btn" value="Save" />
                                    <input type="button" class="submit-dev-btn" id="generate-dev-btn" value="Generate Code" onClick={() => { setDisplay("generate") }} />
                                </div>
                            </If>
                        </div>
                    </form>
                </div>
            </If>
        </>
    );
}
