import { h, render, Fragment } from "preact";
import register from 'preact-custom-element'
import { useEffect, useState } from 'preact/hooks'


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

function YoutubePreview(props) {
    const videoData = props.youtubeData;

    return (
        <div class="video-card-list">
            <div class="video-card-list-thumbnail">
                <div class="list-info-thumbnail">
                    <img src={videoData.thumbnail} />
                </div>
                <div class="list-info-playicon">
                    <i class="fas fa-play-circle"></i>
                </div>
            </div>
            <div class="video-card-list-info">
                <div class="list-info-title">
                    <div class="list-info-title-insidebox">
                        {videoData.title}
                    </div>
                </div>
                <div class="list-info-details">
                    <span class="list-info-channel">
                        <img src={videoData.channel_pic} />
                        <span>{videoData.channel_name}</span>
                    </span>
                    <div class="list-info-number">
                        <span><i class="fas fa-eye"></i> {videoData.view_count}</span>
                        <span><i class="fas fa-thumbs-up"></i> {videoData.like_count}</span>
                        <span><i class="fas fa-thumbs-down"></i> {videoData.dislike_count}</span>
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
    let [previewData, setPreviewData] = useState([]);
    let [display, setDisplay] = useState("forms");
    let [formData, setFormData] = useState([""]);
    let [loading, setLoading] = useState(true);
    let [tab, setTab] = useState("youtube");

    const formUrl = window.location.href.split("/").slice(0, -1).join("/");

    function existVideosShow() {
        setLoading(true);
        fetch(formUrl)
            .then(response => {
                response
                    .json()
                    .then(res => {
                        let urls = res.map(video => "https://www.youtube.com/watch?v=" + video.video_id)
                        setPreviewData(res);
                        if (urls.length > 0) {
                            setFormData(urls);
                            setDisplay("preview");
                        }
                        setLoading(false);
                    });
            })
    }

    // Run existVideosShow when this component is created
    useEffect(() => {
        existVideosShow();
    }, []);

    function preview() {
        setLoading(true);
        const input = document.querySelectorAll('.youtube-hidden-link');
        let url = [];
        for (let i of input) {
            url.push(i.value);
        }

        fetch(formUrl + '/preview', {
            method: 'POST',
            body: JSON.stringify({ "youtube_links": url }),
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors',
        }).then(response => {
            response
                .json()
                .then(res => {
                    setPreviewData(res);
                    setDisplay("preview");
                    setLoading(false);
                }
                );
        })
    }

    function onInputChange(i, e) {
        // copy the formData array
        let data = formData.slice();
        data[i] = e.target.value;

        setFormData(data);
    }

    function addInputBox() {
        let data = formData.slice();
        data.push("");
        setFormData(data);
        setTimeout(() => {
            const links = document.querySelectorAll(".youtube-link");
            links[links.length - 1] && links[links.length - 1].focus();
        }, 100);
    }

    return (
        <form action={formUrl} method="POST">
            <div class="widget-dev">
                <div class="topbar-dev">
                    <div class={tab === "youtube" ? "widget-nav-btn active" : "widget-nav-btn"} onClick={() => setTab("youtube")}>
                        <i class="fab fa-youtube"></i>
                    </div>
                    <div class={tab === "reddit" ? "widget-nav-btn active" : "widget-nav-btn"} onClick={() => setTab("reddit")}>
                        <i class="fab fa-reddit"></i>
                    </div>
                </div>
                <div class="widget-content-dev">
                    <If condition={!loading}>
                        <If condition={tab === "youtube"}>    
                            <If condition={display === "forms"}>
                                <div class="edit-content">
                                    <div class="content-dev">
                                        {formData.map((url, i) =>
                                            <InputBox key={i} value={url} onPreview={preview} onChange={(e) => onInputChange(i, e)} />
                                        )}
                                    </div>
                                    <div class="add-input-dev" onClick={addInputBox}>
                                        <div class="plus-box">
                                            <i class="fas fa-plus"></i>
                                        </div>
                                    </div>
                                </div>
                            </If>
                            <If condition={display === "preview"}>
                                <div class="preview-content">
                                    <div class="content-dev">
                                        {previewData && previewData.map(d => <YoutubePreview youtubeData={d} />)}
                                    </div>
                                </div>
                            </If>
                        </If>
                        <If condition={tab === "reddit"}>
                            <center class="mt-5">
                                <h1>Coming Soon</h1>
                            </center>
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
                { formData.map((url, i) => <input key={i} type="hidden" class="youtube-hidden-link" name="youtube-link[]" value={url} />) }
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
                        <input type="button" class="submit-dev-btn" value="Generate Code" />
                    </div>
                </If>
            </div>
        </form>
    );
}

register(EditWidget, 'edit-widget', [])