/// <reference path="../typings/index.d.ts" />
/// <reference path="./interfaces.d.ts" />

class MathDemo implements MathInterface {    

    constructor(){
        this.PI = 3.14159265359;
    }
    public pow(base: number, exponent: number) {
        var result = base;
        for(var i = 1; i< exponent; i++){
            result = result * base;
        }
        return result;
    }

    powAsync(base: number, exponent: number, cb: (result: number) => void) {
        var result = this.pow(base, exponent);
        cb(result);
    }
    powAysncSlow(base: number, exponent: number, cb: (result: number) => void) {
        setTimeout(()=>{
            var result = this.pow(base, exponent);
            cb(result);
        }, 45);
    }
    powAsyncReallySlow(base: number, exponent: number, cb: (result: number) => void) {
        var result = base ^ exponent;
        setTimeout(()=>{
            var result = this.pow(base, exponent);
            cb(result);
        }, 101);
    }
    powAsyncTooSlow(base: number, exponent: number, cb: (result: number) => void) {
        var result = base ^ exponent;
        setTimeout(function() {
            var result = this.pow(base, exponent);
            cb(result);
        }, 2001);
    }
    bad(foo: any): void {
        if(foo == null){
            throw new Error("Error!");
        }
        else{
            // ...
        }
    }

    public PI: number;
}

export { MathDemo };