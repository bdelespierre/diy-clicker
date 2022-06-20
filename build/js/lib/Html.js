import Assertion from './Assertion.js';
export function el(tag, ...args) {
    Assertion.any(tag, [Assertion.string, Assertion.element]);
    const element = tag instanceof Element ? tag : document.createElement(tag);
    for (const i in args) {
        switch (true) {
            case typeof args[i] === 'undefined':
                break;
            case typeof args[i] === 'string':
            case typeof args[i] === 'number':
                tag instanceof Element
                    ? element.innerHTML = args[i]
                    : element.appendChild(document.createTextNode(args[i]));
                break;
            case typeof args[i] === 'function':
                el(element, args[i](element));
                break;
            case args[i] instanceof Array:
                el(element, ...args[i]);
                break;
            case args[i] instanceof Element:
                element.appendChild(args[i]);
                break;
            case args[i] instanceof Object:
                attr(element, args[i]);
                break;
        }
    }
    return element;
}
export function on(el, evt, fn) {
    el.addEventListener(evt, fn);
}
export function attr(el, attr) {
    for (const [prop, value] of Object.entries(attr)) {
        value === false
            ? el.removeAttribute(prop)
            : el.setAttribute(prop, value === true ? prop : value);
    }
}
export default {
    el,
    on,
    attr
};
