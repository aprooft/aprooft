import { h, render } from "preact";

export default function TopBar(props) {
    return (
        <div class="topbar-dev">
            <div class={props.tab === "youtube" ? "widget-nav-btn active" : "widget-nav-btn"} onClick={() => props.setTab("youtube")}>
                <i class="fab fa-youtube"></i>
            </div>
            <div class={props.tab === "reddit" ? "widget-nav-btn active" : "widget-nav-btn"} onClick={() => props.setTab("reddit")}>
                <i class="fab fa-reddit"></i>
            </div>
        </div>
    )
}