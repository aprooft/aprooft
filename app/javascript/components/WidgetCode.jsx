import { h, render } from "preact";
import { useState } from 'preact/hooks';
// import { Fragment } from "react-is";
import Prism from 'prismjs';
import PrismJSX from "prismjs/components/prism-jsx";
import "prismjs/themes/prism-solarizedlight.css";
import { Check } from "preact-feather";
import * as clipboard from "clipboard-polyfill/text";
import If from "./If";

export default function WidgetCode(props) {
    const code = `<script>
    ((e, l, i, x, y, b, z) => {
    e[y]=e[y]||function(){(e[y].q=e[y].q||[]).push(arguments)};
    b=l.createElement(i);z=l.getElementsByTagName(i)[0];b.async=1;
    b.src=x;z.parentNode.insertBefore(b,z);
    })(window, document, 'script', 'https://aprooft.com/widget.js', 'aprooft');

    aprooft('https://aprooft.com', '${props.widgetId}');
</script>`;

    let highlighted = Prism.highlight(code, Prism.languages.html, "html");
    let [copied, setCopied] = useState(false);
    function copy() {
        clipboard.writeText(code);
        setCopied(true);
        setTimeout(()=>{setCopied(false)}, 600)
    }

    return (
        <div style="width:510px;"> 
            <span style="font-size: 20px">Copy paste this script inside your product page html right above the closing &lt;/body&gt; tag.</span>
            <hr />
            <pre>
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre> 
            <div style="text-align: left; margin-top: 80px">
                < If condition = {!copied} >
                    <button class="submit-dev-btn-lg" onClick={copy}>Copy</button>
                </If>
                < If condition = {copied} >
                <button class="submit-dev-btn-lg"><Check /> Copied!</button>
                <br /> <br />
                </If>  
            </div>   
        </div>
    )
}    