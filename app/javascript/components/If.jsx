export default function If(props) {
    return !!props.condition && props.children;
}