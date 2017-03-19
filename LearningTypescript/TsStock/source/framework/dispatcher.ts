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
        var controller = this._controllersHashMap[route.controllerName];

        // 试图发现controller
        if(controller === null || controller === undefined){
            this.triggerEvent
        }
    }
}