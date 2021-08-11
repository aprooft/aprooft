import { h, render } from "preact";
import register from 'preact-custom-element'

function InputBox(){
    return (
        <div class="input-box">
            <div class="input-box-form">
                <input type="text" id="youtube-link" name="youtube-link[]" placeholder="youtube video url" />

            </div>
            <div class="input-box-icon">
                <i class="fas fa-eye"></i>
                {/* <i class="fas fa-pencil-alt"></i> */}
            </div>
            
        </div>
    )
}

function EditWidget(){
    const formUrl = window.location.href.split("/").slice(0, -1).join("/");
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
            <form action={formUrl} method="POST">
                <div class="content-dev">
                    <InputBox /><InputBox /><InputBox /><InputBox /><InputBox /> 
                </div>
                <div class="submit-dev">
                    <input type="hidden" name="_method" value="PATCH" />
                    <input type="submit" class="submit-dev-btn" >Save</input>
                </div>
            </form>
        </div>
    );    
}

register(EditWidget, 'edit-widget', [])