import { h, render, Fragment } from "preact";
import { useState } from 'preact/hooks';
import If from './If'; 


        // elem.addEventListener('click', (e) => {
        //     e.currentTarget.remove();
        // //   widgetSetting();
        // });
        // document.body.appendChild(elem);



function Widget() {
    const [show, setShow] = useState(false);
    
    return (
        <If condition = {show}>
            <div>
                <p class="widget-button">Aprooft</p>
            </div>
        </If>    
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