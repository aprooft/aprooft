import { h, render } from "preact";
import register from 'preact-custom-element'

function InputBox(){
    return (
        <div class="input-box">
            <div class="input-box-form">
                <input type="text" id="youtube-link" name="youtube-link" placeholder="youtube video url" />
            </div>
            <div class="input-box-icon">
                <i class="fas fa-eye"></i>
                {/* <i class="fas fa-pencil-alt"></i> */}
            </div>
            
        </div>
    )
}

function EditWidget(){
    return (
        <div class="widget-dev">
            <div class="topbar-dev">
                <div class="nav-btn">
                    <i class="fab fa-youtube"></i>
                </div>
                <div class="nav-btn">
                     <i class="fab fa-reddit"></i>
                </div>
            </div>
            <div class="content-dev">
                <InputBox /><InputBox /><InputBox /><InputBox /><InputBox /> 
            </div>
        </div>
    );    
}

register(EditWidget, 'edit-widget', [])