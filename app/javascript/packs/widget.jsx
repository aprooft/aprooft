import register from "preact-custom-element";
import WidgetContent from "../components/WidgetContent"; 
import "../../assets/stylesheets/widget.scss";
// import '@fortawesome/fontawesome-free/js/fontawesome'
// import '@fortawesome/fontawesome-free/js/solid'
// import '@fortawesome/fontawesome-free/js/regular'
// import '@fortawesome/fontawesome-free/js/brands'

function load() {
    if (typeof window.aprooft.q !== 'object') {
        setTimeout(load, 200);
        return;
    }

    const widget = document.createElement("aprooft-widget");
    widget.setAttribute("url", window.aprooft.q[0][0]);
    widget.setAttribute("widget-id", window.aprooft.q[0][1]);
    document.body.appendChild(widget);
}

register(WidgetContent, "aprooft-widget", ["url", "widget-id"]);
load();