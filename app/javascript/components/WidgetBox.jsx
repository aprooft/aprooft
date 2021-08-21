import { h, render, Fragment } from "preact";
import TopBar from "./TopBar";
import If from "./If";

export default function WidgetBox(props) {
    return (
        <div class="widget-dev">
            <TopBar tab={props.tab} setTab={props.setTab}/>
            <div class="widget-content-dev">
                <If condition={!props.loading}>
                    { props.children }
                </If>
                <If condition={props.loading}>
                    <div class="loading-show">
                        <i class="fas fa-spinner fa-pulse"></i>       
                    </div>
                </If>
            </div>
        </div>
    );
}