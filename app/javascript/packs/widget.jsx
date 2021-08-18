import { render } from "preact";
import WidgetCode from "../components/WidgetCode";

function load() {
    if (typeof window.q !== 'object') {
        setTimeout(load, 200);
        return;
    }

    const widget = document.createElement("div");
    render(WidgetCode, widget);
    document.body.appendChild(widget);
}

load();