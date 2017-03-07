/// <reference path="./interfaces.d.ts" />
import { MathDemo } from "./math_demo"
import { CalculatorWidget } from './caculator_widget';

var math = new MathDemo();
var calculator: CalculatorWidgetInterface = new CalculatorWidget(math);

(<any>window).calulator = calculator;

calculator.render("#widget");