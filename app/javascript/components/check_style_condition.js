import { widgetStyling } from './widget_styling';

const checkStyleCondition = () => {
    const urlCondition = window.location.pathname.split('/').slice(-1)[0];
    return urlCondition === 'edit'
}

export { checkStyleCondition }