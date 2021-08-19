import { h, render, Fragment } from "preact";

export default function WidgetCode(props) {
    return (
        <>    
            <div class="widget-dev" style="display:flex; justify-content:center;align-items:center"> 
                <pre>
                    {`<script>
    ((e, l, i, x, y, b, z) => {
    e[y]=e[y]||function(){(e[y].q=e[y].q||[]).push(arguments)};
    b=l.createElement(i);z=l.getElementsByTagName(i)[0];b.async=1;
    b.src=x;z.parentNode.insertBefore(b,z);
    })(window, document, 'script', 'https://aprooft.com/widget.js', 'aprooft');

    aprooft('https://aprooft.com', '${props.widgetId}');
</script>`}
                </pre> 
            </div>   
        </>    
    )
}    