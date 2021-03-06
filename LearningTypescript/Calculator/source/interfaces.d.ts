/// <reference path="../typings/index.d.ts" />

interface MathInterface {
    PI: number;
    pow(base: number, exponent: number);
    powAsync(base: number, exponent: number, cb: (result: number) => void);
    powAysncSlow(base: number, exponent: number, cb: (result: number) => void);
    powAsyncReallySlow(base: number, exponent: number, cb: (result: number) => void);
    powAsyncTooSlow(base: number, exponent: number, cb: (result: number) => void);
    bad(foo: any): void;
}

interface CalculatorWidgetInterface {
    render(id: string);
    onSubmit(): void;
}