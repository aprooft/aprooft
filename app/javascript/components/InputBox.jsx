import { h, render } from "preact";

export default function InputBox(props) {
    return (
        <div class="input-box">
            <div class="input-box-form">
                <input type="text" class={`${props.tab}-link`} placeholder="url" value={props.value} onChange={props.onChange} />
            </div>
            <div class="input-box-icon">
                <i class="fas fa-eye eyeicon" onClick={props.onPreview}></i>
                {/* <i class="fas fa-pencil-alt"></i> */}
            </div>

        </div>
    )
}