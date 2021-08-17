import { h, render, Fragment } from "preact";
import { useState } from 'preact/hooks';
import If from './If'; 
import WidgetBox from "./WidgetBox";


        // elem.addEventListener('click', (e) => {
        //     e.currentTarget.remove();
        // //   widgetSetting();
        // });
        // document.body.appendChild(elem);



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
            <div class={widgetBoxClasses}  onClick={() => setShow(true)}>
                <WidgetBox tab={"youtube"} setTab={() => {}} loading={false}>
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