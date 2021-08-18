import register from "preact-custom-element";
import WidgetCode from "../components/WidgetCode";
import "../../assets/stylesheets/widget.scss";

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

register(WidgetCode, "aprooft-widget", ["url", "widget-id"]);
load();
