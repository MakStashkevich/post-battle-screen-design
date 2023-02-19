export const IS_PRODUCTION = Boolean(
    process.env.NODE_ENV === "production" ||
    process.env.REACT_APP_ENV === "production" ||
    process.env.REACT_APP_ENV === "staging"
);
export const IS_DEVELOPMENT = Boolean(
    process.env.NODE_ENV === "development" ||
    process.env.REACT_APP_ENV === "development" ||
    process.env.REACT_APP_ENV === "dev" ||
    process.env.REACT_APP_ENV === "docker-dev" ||
    !IS_PRODUCTION  // if other statements not found
);

export const PUBLIC_API_URL = process.env.REACT_APP_PUBLIC_API_URL ?? '';

function envIsTrue(value: string | undefined): boolean {
    return Boolean(String(value ?? '').toLowerCase() === 'true')
}

export const IS_IGNORE_API = envIsTrue(process.env.REACT_APP_IGNORE_API);