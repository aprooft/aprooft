import { h, render, Fragment } from "preact";
import { useState } from 'preact/hooks';
import If from './If'; 
import WidgetBox from "./WidgetBox";


function Widget(props) {
    const [show, setShow] = useState(true);

    const widgetBoxClasses = show ? "widget-wrapper" : "widget-wrapper active";

    return (
        <>
            <If condition = {show}>
                <div>
                    <button class="widget-button" onClick={() => setShow(false)}>Aprooft</button>
                </div>
            </If>  
            <div class={widgetBoxClasses}>
                
                <WidgetBox tab={"youtube"} setTab={() => {}} loading={false}>
                    <i class="fas fa-times close-icon" onClick={() => setShow(true)}></i>
                    <p>hello</p>
                </WidgetBox>
            </div>
        </>
    );
}

export default function WidgetCode(props) {
    return (
        <>    
            {/* <div class="widget-dev"> 
                <pre>
                    {`
                        () => {}...
                    `}
                </pre> 
            </div>    */}
            <Widget {...props}/>
        </>    
    )
}    