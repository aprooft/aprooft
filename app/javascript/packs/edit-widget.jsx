import { h, render } from "preact";
import register from 'preact-custom-element'
import { useState } from 'preact/hooks'

function InputBox() {
    return (
        <div class="input-box">
            <div class="input-box-form">
                <input type="text" class="youtube-link" name="youtube-link[]" placeholder="youtube video url" />

            </div>
            <div class="input-box-icon">
                <i class="fas fa-eye"></i>
                {/* <i class="fas fa-pencil-alt"></i> */}
            </div>

        </div>
    )
}

function EditWidget() {
    let [previewData, setPreviewData] = useState([]);

    const formUrl = window.location.href.split("/").slice(0, -1).join("/");

    function preview() {
        const input = document.querySelectorAll('.youtube-link');
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
                .then(res => setPreviewData(res));
        })
    }

    return (
        <div class="widget-dev">
            <div class="topbar-dev">
                <div class="widget-nav-btn active">
                    <i class="fab fa-youtube"></i>
                </div>
                <div class="widget-nav-btn">
                    <i class="fab fa-reddit"></i>
                </div>
            </div>
            <form action={formUrl} method="POST">
                <div class="content-dev">
                    {previewData && previewData.map(d => <p>{d.video_id}</p>)}
                    <InputBox /><InputBox /><InputBox /><InputBox /><InputBox />
                </div>
                <div class="submit-dev">
                    {/* <input type="hidden" name="_method" value="PATCH" /> */}
                    <input type="button" class="submit-dev-btn" value="Preview" onClick={preview} />
                </div>
            </form>
        </div>
    );
}

register(EditWidget, 'edit-widget', [])