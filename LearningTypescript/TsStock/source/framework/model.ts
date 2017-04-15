/// <reference path="./interface.ts" />

import { EventEmitter } from './event_emitter';

function ModelSettings(serviceUrl: string){
    return function(target: any){
        // 保存原构造函数的引用
        var original = target;

        // 一个用于生成类实例的工具函数
        function construct(constructor, args){
            var c: any = function(){
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            var instance = new c();
            instance._serviceUrl = serviceUrl;
            return instance;
        }

        // 新构造函数的行为
        var f: any = function(...args){
            return construct(original, args);
        }

        // 为了使instance操作符继续可用，复制原型
        f.prototype = original.prototype;

        // 返回新的构造函数(将覆盖原来的)
        return f;
    }
}

class Model extends EventEmitter implements IModel {
    private _serviceUrl: string;

    initialize(): void {
        throw new Error('Method not implemented.');
    }
    dispose(): void {
        throw new Error('Method not implemented.');
    }

    protected requestAsync(method: string, dataType: string, data){
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            $.ajax({
                method: method,
                url: this._serviceUrl,
                data: data || {},
                dataType: dataType,
                success: (response) => {
                    resolve(response);
                },
                error: (...args: any[]) =>{
                    reject(args);
                }
            });
        });
    }

    protected getAsync(dataType: string, data: any){
        return this.requestAsync("GET", dataType, data);
    }

    protected postAsync(dataType: string, data: any){
        return this.requestAsync("POST", dataType, data);
    }

    protected putAsync(dataType: string, data: any){
        return this.requestAsync("PUT", dataType, data);
    }

    protected deleteAsync(dataType: string, data: any){
        return this.requestAsync("DELETE", dataType, data);
    }
}

export { Model, ModelSettings }