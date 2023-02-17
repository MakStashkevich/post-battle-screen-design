export function convertNumber(num: number): string {
    return num.toLocaleString('en-US')
}

export function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(getRandomArbitrary(min, max));
}