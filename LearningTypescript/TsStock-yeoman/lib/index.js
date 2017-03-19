"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Greeter_1 = require("./main/Greeter");
exports.Greeter = Greeter_1.default;
/**
 * Export Greeter to public by binding them to the window property.
 */
window['App'] = {
    'Greeter': Greeter_1.default
};
