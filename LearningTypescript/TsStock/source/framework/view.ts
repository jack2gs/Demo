/// <reference path="./interface.ts" />

import { EventEmitter } from './event_emitter';
import { AppEvent } from './app_event';

function ViewSettings(templateUrl: string, container: string) {
    return function(target: any){
        // 保存原构造函数的引用
        var original = target;

        // 一个用于生成类实例的工具函数
        function construct(constructor， args){
            var c: any = function (){
                return constructor.apply(this, args);
            }

            c.prototype = constructor.prototype;
            var instance = new c();
            instance._container = container;
            instance._templateUrl = templateUrl;
            return instance;
        }

        // 新的构造函数
        var f: any = function(...args){
            return construct(original, args);
        }

        // 为了使instanceof操作符继续使用，复制原型
        f.prototype = original.prototype;
        
        // 返回新的构造函数（将覆盖原来的）
        return f;
    }
}

class View extends EventEmitter implements IView {
    initialize(): void {
        throw new Error('Method not implemented.');
    }
    dispose(): void {
        throw new Error('Method not implemented.');
    }

    // _container 和 _templateUrl的值必须使用viewsettings装饰器设置
    protected _container: string;
    protected _templateUrl: string;

    private _templateDelegate: HandlebarsTemplateDelegate;
    constructor(metiator: IMediator){
        super(metiator);
    }

    protected bindDomEvents(model: any){
        throw new Error('View.prototype.bindDomEvents() is abstract and must implemented.');
    }

    protected unbindDomEvents(){
        throw new Error("View.prototype.unbindDomEvents() is abstract and must implemented.");
    }

    // load template asynchronizedly
    private loadTemplateAsnc(){
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            $.ajax({
                method: "GET",
                url: this._templateUrl,
                dataType: "text",
                success: (response) => {
                    resolve(response);
                },
                error: (...args: any[]) => {
                    reject(args);
                }
            });
        });
    }

    // compile the template
    private compileTemplateAsync(source: string){
        return Q.Promise((resolve: (r) => {}, reject: (e)=>{}) => {
            try{
                var template = Handlebars.compile(source);
                resolve(template);
            }
            catch(e){
                reject(e);
            }
        });
    }

    // 若操作仍未完成，则异步加载和编译一个模板
    private getTemplateAsync(){
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            if(this._templateDelegate === undefined || this._templateDelegate === null){
                this.loadTemplateAsnc()
                    .then((source) => {
                        return this.compileTemplateAsync(source);
                    })
                    .then((templateDelegate) => {
                        this._templateDelegate = templateDelegate;
                        resolve(this._templateDelegate);
                    })
                    .catch((e) => { reject(e); });
            }
            else{
                resolve(this._templateDelegate);
            }
        });
    }

    protected renderAsync(model){
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            this.getTemplateAsync()
                .then((templateDelegate) => {
                    // 生成HTML并添加到DOM中
                    var html = this._templateDelegate(model);
                    $(this._container).html(html);
                    
                    // 将model作为参数传给model
                    // 让子视图和DOM事件初始化
                    resolve(model);
                })
                .catch((e)=>{
                    reject(e);
                });
        });
    }
}



export { View, ViewSettings};