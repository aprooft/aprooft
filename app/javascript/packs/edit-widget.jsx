import { h, render } from "preact";
import register from 'preact-custom-element'

function EditWidget(){
    return (
        <div class="widget-dev">
            <div class="topbar-dev">
                <div class="nav-btn">
                    <img src="https://img.icons8.com/material-outlined/55/ffffff/youtube--v1.png"/>                
                </div>
                <div class="nav-btn">
                    <img src="https://img.icons8.com/ios-glyphs/55/ffffff/reddit.png"/>           
                </div>
            </div>
            <div class="content-dev">
                <div class="input-box">
                    <div class="sf-input-box">
                        <input type="text" id="youtube-link" name="youtube-link" placeholder="youtube video url" />
                    </div>
                    <div class="edit-icon">
                        <img src="https://img.icons8.com/ios-glyphs/30/409ae2/visible--v1.png"/>
                        <img src="https://img.icons8.com/ios-glyphs/30/fa314a/edit--v1.png"/>
                    </div>
                </div>
            </div>
        </div>
    );    
}

register(EditWidget, 'edit-widget', [])