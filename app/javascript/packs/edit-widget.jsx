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
                    <div class="input-box-form">
                        <input type="text" id="youtube-link" name="youtube-link" placeholder="youtube video url" />
                    </div>
                    <div class="input-box-icon">
                        <i class="fas fa-eye"></i>
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                    
                </div>
            </div>
        </div>
    );    
}

register(EditWidget, 'edit-widget', [])