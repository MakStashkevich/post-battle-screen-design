import fetch, {UnfetchRequestInit} from "unfetch/src/index"; // unfetch is used, because it takes only 582 bytes...
import {PUBLIC_API_URL} from "../lib/dictionary";
import {apiError, ApiErrorParams} from "./apiError";

interface ApiRequestType {
    [key: string | number]: any;
}

interface ApiResultType {
    [key: string]: any;
}

interface ApiResultErrorType extends ApiResultType {
    error?: ApiErrorParams;
}

function encodeQueryParams(params: ApiRequestType) {
    const ret = [];
    for (let v in params) {
        const value = params[v];
        if (typeof value !== "object") {
            ret.push(encodeURIComponent(v) + '=' + encodeURIComponent(String(value)));
        }
    }
    return ret.join('&');
}

type apiFetchResultType<T> = T extends ApiResultType ? T : ApiResultType;

export async function apiFetch<T>(
    path: string | URL,
    params?: ApiRequestType,
    options?: UnfetchRequestInit
): Promise<apiFetchResultType<T>> {
    let query;
    if (params) {
        query = encodeQueryParams(params);
    }
    const headers: any = options?.headers ?? {};
    headers['accept'] = 'application/json';
    const res = await fetch(PUBLIC_API_URL + path + '/' + (query ? `?${query}` : ''), {
        ...options,
        headers,
    });
    const data: ApiResultErrorType = await res.json();
    if (!data) {
        throw new apiError({type: "result_not_found", detail: "Result not found."})
    }
    if (data.error) {
        throw new apiError(data.error);
    }
    return data as apiFetchResultType<T>;
}

export async function apiGet<T>(
    path: string,
    params?: ApiRequestType
) {
    return apiFetch<T>(path, params, {
        method: 'GET'
    })
}