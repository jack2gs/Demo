/// <reference path="../typings/index.d.ts" />
import { MathDemo } from '../source/math_demo';
import {CalculatorWidget} from "../source/caculator_widget"

var expect = chai.expect; 
describe("MathDemo", function(){
    var math: MathInterface = null;

    before(function(){
        math = new MathDemo();
    });

    after(function(){
        math = null;
    });

    it("should return the correct numberic value for PI", function(){
        var math: MathInterface = new MathDemo();
        expect(math.PI).to.equals(3.14159265359);
        expect(math.PI).to.be.a("number");
    });

    it("should return the correct numberic value for pow", function(){
        var expected = 243;
        var actual = math.pow(3, 5);

        expect(actual).to.equal(expected);
    });
});


describe("BDD test example for CaculatorWidget class\n", ()=>{
    before(function(){
        $("body").append("<div id='widget'/>");
    });

    beforeEach(function(){
        $("#widget").empty();
    });
    
    it('onSubmit should be invoded when #submit is clicked', ()=>{
        var math: MathInterface = new MathDemo();
        var calculator = new CalculatorWidget(math);
        calculator.render("#widget");
        $('#base').val("2");
        $("#exponent").val("3");

        // 监视onSubmit
        var onSubmitSpy = sinon.spy(calculator, "onSubmit");
        $("#submit").trigger("click");
        
        // 当#submit被单击时，断言calculator.onSubmit会被执行
        expect(onSubmitSpy.called).to.equal(true);
        expect(onSubmitSpy.callCount).to.equal(1);
        expect($("#result").val()).to.equal("8");
    });
});