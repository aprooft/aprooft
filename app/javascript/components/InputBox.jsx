import { h, render } from "preact";

export default function InputBox(props) {
    return (
        <div class="input-box">
            <div class="input-box-form">
                <input type="text" class={`${props.tab}-link`} placeholder="url" value={props.value} onChange={props.onChange} />
            </div>
        </div>
    )
}