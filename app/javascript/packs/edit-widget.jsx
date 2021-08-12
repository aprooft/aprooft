import { h, render } from "preact";
import register from 'preact-custom-element'

function EditWidget(){
    return <p>Test</p> 
}

register(EditWidget, 'edit-widget', [])