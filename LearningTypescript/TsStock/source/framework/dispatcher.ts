/// <reference path="./interface.ts" />

import { EventEmitter } from "./event_emitter";
import { AppEvent } from "./app_event";

class Dispatcher extends EventEmitter implements IDispatcher {
    private _controllersHashMap: Object;
    private _currentController: IController;
    private _currentControllerName: string;

    constructor(mediator: IMediator, controllers: IControllerDetails[]){
        super(mediator);
        this._controllersHashMap = this.getController(controllers);
        this._currentController = null;
        this._currentControllerName = null;
    }


    private getController(controllers: IControllerDetails[]): Object{
        var hashMap, hashMapEntry, name, controller, l;

        hashMap = {};
        l = controllers.length;
        
        if(l <= 0 ){
            this.triggerEvent(new AppEvent("app.error", "Cannot create an application without at least on controller.", null));
        }

        for(var i = 0; i < l; i++){
            controller = controllers[i];
            name = controller.controllerName;
            hashMapEntry = hashMap[name];
            if(hashMapEntry !== null && hashMapEntry !== undefined){
                this.triggerEvent(new AppEvent("app.error",
                "Tow controllers cannot use the same name.",
                null));
            }
            hashMap[name] = controller;
        }
        return hashMap;
    }
    private dispatch(route: IRoute){
        var Controller = this._controllersHashMap[route.controllerName];

        // 试图发现controller
        if(Controller === null || Controller === undefined){
            this.triggerEvent(new AppEvent(
                "app.error",
                `Controller not found: ${route.controllerName}` ,
                null
            ));
        }
        else{
            // 创建一个controller实例
            var controller: IController = new Controller(this._mediator);
            // 行为不可用
            var a = controller[route.actionName];
            if(a === null || a === undefined){
                this.triggerEvent(new AppEvent("app.error", `Action not found in controller: ${route.controllerName} - ${route.actionName}`,null));
            }
            // 行为可用
            else{
                if(this._currentControllerName === null){
                    // initialize the controller
                    this._currentControllerName = route.controllerName;
                    this._currentController = controller;
                    this._currentController.initialize();
                }
                else{
                    if(this._currentControllerName !== route.controllerName){
                        this._currentController.dispose();
                        this._currentControllerName = route.controllerName;
                        this._currentController = controller;
                        this._currentController.initialize();
                    }
                }
            }
            // 将流从调试器传递至controller
            this.triggerEvent(new AppEvent(
                `app.controller.${this._currentControllerName}.${route.actionName}`,
                route.args,
                null));
        }
    }
}

export {Dispatcher};