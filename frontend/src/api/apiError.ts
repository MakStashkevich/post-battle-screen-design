export interface ApiErrorParams {
    code?: number;
    type?: string;
    detail: string | object | Array<any>;
}

export class apiError extends Error {
    name: string = "ApiError";
    message: string = "Unknown error.";

    code: number = 0;
    type: string = "system_error";
    detail: string | object | Array<any>;

    constructor(params: ApiErrorParams) {
        super();
        if (params.code) this.code = params.code;
        if (params.type) this.type = params.type;
        this.detail = params.detail;
        this.message = `[${params.code ?? 0} & ${params.type ?? 'system_error'}]: ${String(params.detail)}`;
    }
}