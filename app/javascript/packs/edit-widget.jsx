import { h, render, Fragment } from "preact";
import register from 'preact-custom-element'
import { useEffect, useState } from 'preact/hooks'
import TopBar from "../components/TopBar"


function InputBox(props) {
    return (
        <div class="input-box">
            <div class="input-box-form">
                <input type="text" class="youtube-link" placeholder="youtube video url" value={props.value} onChange={props.onChange} />
            </div>
            <div class="input-box-icon">
                <i class="fas fa-eye eyeicon" onClick={props.onPreview}></i>
                {/* <i class="fas fa-pencil-alt"></i> */}
            </div>

        </div>
    )
}

function RedditPreview(props) {
    return (<p>Coming soon</p>);
}

function YoutubePreview(props) {
    const data = props.data;

    return (
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
    );
}

function If(props) {
    return <>{ !!props.condition && props.children }</>;
}

function EditWidget() {
    let [redditPreviewData, setRedditPreviewData] = useState([]);
    let [youtubePreviewData, setYoutubePreviewData] = useState([]);
    let [display, setDisplay] = useState("forms");
    let [youtubeData, setYoutubeData] = useState([""]);
    let [redditData, setRedditData] = useState([""]);
    let [loading, setLoading] = useState(true);
    let [tab, setTab] = useState("youtube");

    const formUrl = window.location.href.split("/").slice(0, -1).join("/");
    // const widgetId = parseInt(window.location.href.split("/").slice(-2, -1)[0], 10);
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

                        let rUrls = res["reddits"].map(reddit => "" + reddit);
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
                    setYoutubePreviewData(res);
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
        let data = youtubeData.slice();
        data.push("");
        setYoutubeData(data);
        setTimeout(() => {
            const links = document.querySelectorAll(".youtube-link");
            links[links.length - 1] && links[links.length - 1].focus();
        }, 100);
    }

    return (
        <>
            <If condition={display === "generate"}>
                <p>coming soon</p>
                <input type="button" class="submit-dev-btn-back" value="Back" onClick={() => { setDisplay("preview") }} />
            </If>
            <If condition={display != "generate"}>      
                <form action={formUrl} method="POST">
                    <div class="widget-dev">
                        <TopBar tab={tab} setTab={setTab}/>
                        <div class="widget-content-dev">
                            <If condition={!loading}>
                                <If condition={display === "forms"}>
                                    <div class="edit-content">
                                        <If condition={tab === "reddit"}>
                                            <div class="content-dev">
                                                {redditData.map((url, i) =>
                                                    <InputBox key={i} value={url} onPreview={preview} onChange={(e) => onInputChange(tab, i, e)} />
                                                )}
                                            </div>
                                            <div class="add-input-dev" onClick={addInputBox}>
                                                <div class="plus-box">
                                                    <i class="fas fa-plus"></i>
                                                </div>
                                            </div>                                           
                                        </If>
                                        <If condition={tab === "youtube"}>
                                            <div class="content-dev">
                                                {youtubeData.map((url, i) =>
                                                    <InputBox key={i} value={url} onPreview={preview} onChange={(e) => onInputChange(tab, i, e)} />
                                                )}
                                            </div>
                                            <div class="add-input-dev" onClick={addInputBox}>
                                                <div class="plus-box">
                                                    <i class="fas fa-plus"></i>
                                                </div>
                                            </div>
                                        </If>
                                    </div>
                                </If>
                                <If condition={display === "preview"}>
                                    <div class="preview-content">
                                        <div class="content-dev">
                                            <If condition={tab === "reddit"}>
                                                { redditPreviewData && redditPreviewData.map(d => <RedditPreview data={d} />) }
                                            </If>
                                            <If condition={tab === "youtube"}>
                                                { youtubePreviewData && youtubePreviewData.map(d => <YoutubePreview data={d} />) }
                                            </If>
                                        </div>
                                    </div>
                                </If>
                            </If>
                            <If condition={loading}>
                                <div class="loading-show">
                                    <i class="fas fa-spinner fa-pulse"></i>
                                </div>
                            </If>
                        </div>
                    </div>
                    <div class="d-none">
                        { youtubeData.map((url, i) => <input key={i} type="hidden" class="youtube-hidden-link" name="youtube-link[]" value={url} />) }
                    </div>
                    <div class="mt-4">
                        <If condition={display === "forms"}>
                            <div class="submit-dev">
                                <input type="button" class="submit-dev-btn" value="Preview" onClick={preview} />
                            </div>
                        </If>
                        <If condition={display === "preview"}>
                            <div class="submit-dev">
                                <input type="button" class="submit-dev-btn-back" value="Edit" onClick={() => { setDisplay("forms") }} />           
                                <input type="hidden" name="_method" value="PATCH" />
                                <input type="submit" class="submit-dev-btn" value="Save" />
                                <input type="button" class="submit-dev-btn" value="Generate Code" onClick={() => { setDisplay("generate") }} />
                            </div>
                        </If>
                    </div>
                </form>
            </If>    
        </>    
    );
}

register(EditWidget, 'edit-widget', [])