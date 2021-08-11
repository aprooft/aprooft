import { h, render } from "preact";
import register from 'preact-custom-element'

function EditWidget(){
    return (
        <div class="widget-dev">
            <div class="topbar-dev">

            </div>
            <p>3</p>
        </div>
    );    
}

register(EditWidget, 'edit-widget', [])