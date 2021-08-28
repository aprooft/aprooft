import { h, render } from "preact";
import { useState } from 'preact/hooks';
// import { Fragment } from "react-is";
import Prism from 'prismjs';
import PrismJSX from "prismjs/components/prism-jsx";
import "prismjs/themes/prism-solarizedlight.css";
import { Copy } from "preact-feather";
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
    }

    return (
        <div class="widget-code-box"> 
            < If condition = {!copied} >
                <span onClick={copy} style="padding-right: 10px"><Copy size={28} /></span><span style="font-size: 20px">Copy paste this script inside your product page html right above the closing &lt;/body&gt; tag.</span>
            </If>
            < If condition = {copied} >
                <span style="font-size: 20px">Copied!</span>
            </If>  
            <hr />
            <pre>
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>  
        </div>
    )
}    