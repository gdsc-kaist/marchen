import {cubicIn, cubicOut} from 'svelte/easing'
import {get} from "svelte/store";
import {page} from "$app/stores";

export type EasingFunction = (t: number) => number;

export interface TransitionConfig {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
    css?: (t: number, u: number) => string;
    tick?: (t: number, u: number) => void;
}

export interface FlyParams {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
    x?: number;
    y?: number;
    opacity?: number;
}


export function s(node: Element, delay: any) {
    const style = getComputedStyle(node), height = +style.height;
    if (delay === undefined || typeof delay === 'object') {
        delay = ([...node.parentElement?.children].indexOf(node)) * (500 / node.parentElement?.children.length) + 40;
    }
    return {
        delay,
        duration: 500,
        easing: cubicOut,
        css: (t: number) => {
            return `
			opacity: ${Math.max(t * 2 - 1, 0)};
			transform: translateY(${(1 - t) * 20}px);`
        },
    };
}

/**
 * `axis` (`x` | `y`, default `y`) — the axis of motion along which the transition occurs
 */
export function horizontalSlide(node: HTMLElement, {
    delay = 0,
    duration = 200,
    easing = cubicOut,
    axis = 'x'
} = {}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const primary_property = axis === 'y' ? 'height' : 'width';
    const primary_property_value = parseFloat(style[primary_property]);
    const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
    const capitalized_secondary_properties = secondary_properties.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`);
    const padding_start_value = parseFloat(style[<any>`padding${capitalized_secondary_properties[0]}`]);
    const padding_end_value = parseFloat(style[<any>`padding${capitalized_secondary_properties[1]}`]);
    const margin_start_value = parseFloat(style[<any>`margin${capitalized_secondary_properties[0]}`]);
    const margin_end_value = parseFloat(style[<any>`margin${capitalized_secondary_properties[1]}`]);
    const border_width_start_value = parseFloat(style[<any>`border${capitalized_secondary_properties[0]}Width`]);
    const border_width_end_value = parseFloat(style[<any>`border${capitalized_secondary_properties[1]}Width`]);
    return {
        delay,
        duration,
        easing,
        css: (t: number) =>
            'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `${primary_property}: ${t * primary_property_value}px;` +
            `padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
            `padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
            `margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
            `margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
            `border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
            `border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
    };
}

/**
 * `direction` (`block` | `inline`, default `block`) — direction along which the transition occurs (For left-to-right writing systems like English `block` corresponds to a vertical and `inline` to a horizontal slide transition)
 */
export function logicalPropertiesHorizontalSlide(node: HTMLElement, {
    delay = 0,
    duration = 400,
    easing = cubicOut,
    direction = 'block'
} = {}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;

    const capitalized_logical_property = `${direction[0].toUpperCase()}${direction.slice(1)}`;

    const size_value = parseFloat(style[<any>`${direction}Size`]);
    const padding_start_value = parseFloat(style[<any>`padding${capitalized_logical_property}Start`]);
    const padding_end_value = parseFloat(style[<any>`padding${capitalized_logical_property}End`]);
    const margin_start_value = parseFloat(style[<any>`margin${capitalized_logical_property}Start`]);
    const margin_end_value = parseFloat(style[<any>`margin${capitalized_logical_property}End`]);
    const border_width_start_value = parseFloat(style[<any>`border${capitalized_logical_property}StartWidth`]);
    const border_width_end_value = parseFloat(style[<any>`border${capitalized_logical_property}EndWidth`]);

    return {
        delay,
        duration,
        easing,
        css: (t: number) =>
            'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `${direction}-size: ${t * size_value}px;` +
            `padding-${direction}-start: ${t * padding_start_value}px;` +
            `padding-${direction}-end: ${t * padding_end_value}px;` +
            `margin-${direction}-start: ${t * margin_start_value}px;` +
            `margin-${direction}-end: ${t * margin_end_value}px;` +
            `border-${direction}-start-width: ${t * border_width_start_value}px;` +
            `border-${direction}-start-width: ${t * border_width_end_value}px;`
    };
}

export function fly(node: Element, {
    delay = 0,
    duration = 400,
    easing = cubicOut,
    x = 0,
    y = 0,
    opacity = 0
}: FlyParams = {}): TransitionConfig {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;

    const od = target_opacity * (1 - opacity);
    const dis = target_opacity ? '' : "display: none;";

    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}
			${dis}`,
    };
}

export function blur(node: Element, params: any): TransitionConfig {
    const {
        radius = 5,
        inverse = false,
        delay = 0,
        duration = 400,
        easing = cubicOut,
    } = params;

    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			opacity: ${t}; 
			filter: blur(${(inverse ? t : u) * radius}px);
			transform: translateY(${(1 - t) * 10}px);
		`
    };
}

export function show(node: Element, {
    delay = 0,
    duration = 600,
    easing = cubicOut,
    use = true
}: FlyParams & { use: boolean } = <any>{}): TransitionConfig {
    const style = getComputedStyle(node), height = +style.height;
    if (!use) duration = 0;
    if (!duration) duration = 0;

    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			padding: ${Math.min(t * 2, 1) * 10}px 10px;
			height: ${Math.min(t * 2, 1) * height}px;
			opacity: ${Math.max(t * 2 - 1, 0)};
			transform: translateY(${(1 - t) * 10}px);`,
    };
}

export function hide(node: Element, {
    delay = 0,
    duration = 300,
    easing = cubicIn,
    use = true
}): TransitionConfig {
    const style = getComputedStyle(node), height = +style.height;
    if (!use) duration = 0;
    if (!duration) duration = 0;

    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
            padding: ${(t * 2 - 1) * 10}px 10px;
            height: ${(t * 2 - 1) * height}px;
            opacity: ${(t * 2 - 1)};
            transform: translateY(${(1 - t) * 10}px);`,
    };
}

export const initCode = (url: string) => url.includes('/problem/') || url.includes('/submission/')