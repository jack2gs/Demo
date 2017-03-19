/// <reference path="./interface.ts" />

import { EventEmitter } from './event_emitter';
import { AppEvent } from './app_event';
import { Route } from './route';

class Router extends EventEmitter implements IRouter{
    private _defaultController: string;
    private _defaultAction: string;
    constructor(mediator: IMediator, defaultController: string, defaultAction: string){
        super(mediator);
        this._defaultAction = defaultAction;
        this._defaultController = defaultController;
    }

    public initialize(): void{
        // 监测URL被用户改变
        $(window).on('hashchange', ()=>{
            var r = this.getRoute();
            this.onRouteChange(r);
        });

        this.subscribeToEvents([
            new AppEvent("app.initialize", null, (e: any, data?: any) => {
                this.onRouteChange(this.getRoute());
            }),
            new AppEvent("app.route", null, (e: any, data?: any) => {
                this.setRoute(data);
            })
        ])
    }

    // 读取URL
    private getRoute(): Route{
        var h = window.location.hash;
        return this.parseRoute(h);
    }

    // 改变URL
    private setRoute(route: Route){
        var s = route.serialize();
        window.location.hash = s;
    }

    // 解析URL
    private parseRoute(hash: string){
        var comp, controller, action, args, i;
        if(hash[hash.length-1] === '/'){
            hash = hash.substring(0, hash.length - 1);
        }
        comp = hash.replace("#", "").split("/");
        controller  = comp[0] || this._defaultController;
        action = comp[1] || this._defaultAction;

        args = [];
        for(i = 2; i < comp.length; i++){
            args.push(comp[i]);
        }
        return new Route(controller, action, args);
    }

    // 通过中介器将控制权移交给调度器
    private onRouteChange(route: Route){
        this.triggerEvent(new AppEvent("app.dispatch", route, null));
    }
}

export { Route };