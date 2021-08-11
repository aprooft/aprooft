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
            <p>3</p>
        </div>
    );    
}

register(EditWidget, 'edit-widget', [])