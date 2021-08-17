import { h, render, Fragment } from "preact";
import { useState } from 'preact/hooks';
import If from './If'; 


        // elem.addEventListener('click', (e) => {
        //     e.currentTarget.remove();
        // //   widgetSetting();
        // });
        // document.body.appendChild(elem);



function Widget() {
    const [show, setShow] = useState(true);

    const widgetBoxClasses = show ? "widget-box" : "widget-box active";

    return (
        <>    
            <If condition = {show}>
                <div>
                    <button class="widget-button" onClick={() => setShow(false)}>Aprooft</button>
                </div>
            </If>  
            <div class={widgetBoxClasses}  onClick={() => setShow(true)}>
                coming soon
            </div>
        </>     
    );
}

export default function WidgetCode(props) {
    return (
        <>    
            {/* <div class="widget-dev">
                coming soon 
                <pre>
                    {`
                        () => {}...
                    `}
                </pre> 
            </div>    */}
            <Widget />
        </>    
    )
}    