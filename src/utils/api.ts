import {browser} from "$app/environment";
import {tick} from "svelte";
//@ts-ignore
import {get_current_component} from "svelte/internal";


export const staticUrl = 'https://s.jungol.co.kr'
export const endpoint = import.meta.env.DEV ? 'http://localhost:2023' : (import.meta.env.VITE_BETA ? 'https://oz-beta.marchen.kaist.io' : 'https://oz.marchen.kaist.io')

export default function api(path: string, data: any = undefined, method = 'POST') {
    if (!browser) return new Promise<{ data: any }>(() => null)
    let comp
    try {
        comp = get_current_component()
    } catch (e) {
    }
    if (comp && comp?.$$?.root?.parentElement !== document.body)
        return new Promise(async (resolve, reject) => {
            setTimeout(
                () =>
                    tick()
                        .then(() => api(path, data, method))
                        .then(resolve)
                        .catch(reject),
                1
            )
        })
    return new Promise(async (resolve, reject) => {
        fetch(endpoint + path, {
            credentials: 'include',
            method: data ? method : 'GET',
            body: data ? JSON.stringify(data) : undefined,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json()).then((res) => {
            if (import.meta.env.DEV) console.log('API Request', path, res)
            if (!res.error) resolve(res.data)
            else reject({...res, toString: () => `APIError(${res.code}): ${res.error}`})
        }).catch(reject)
    })
}

export function getQuery(obj: any, override = true) {
    const query = new URLSearchParams(location.search);
    for (const [key, value] of Object.entries(obj)) {
        if (override || !query.has(key)) query.set(key, <any>value);
    }
    return '?' + query.toString();
}

export function refresh(...detail: any[]) {
    const refresh = new CustomEvent('clear', {detail});
    window.dispatchEvent(refresh);
}

export function perm(account: any, act: string) {
    return (!act.startsWith('block') && account?.permission?.admin) || account?.permission?.[act];
}