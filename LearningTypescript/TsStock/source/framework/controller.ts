/// <reference path="./interface.ts" />

import { EventEmitter } from "./event_emitter";

class Controller extends EventEmitter implements IController {
    initialize(): void {
        throw new Error('Method not implemented.');
    }
    dispose(): void {
        throw new Error('Method not implemented.');
    }

    constructor(mediator: IMediator){
        super(mediator);
    }
}

export {Controller};