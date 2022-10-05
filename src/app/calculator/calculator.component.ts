import { Component, OnInit } from '@angular/core';

import { Calculator } from '../calculator/model/calculator';
import { CalculatorService } from '../calculator/services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  expression:string = '';
  input: string = '';
  result: string = '';
  userValue: string = '';
  calculator : Calculator = new Calculator();  

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {
  }

  pressNum(num: string) {
    
    //Do Not Allow . more than once
    if (num==".") {
      if (this.input !="" ) {
 
        const lastNum=this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
 
    if (num=="0") {
      if (this.input=="" ) {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  {
          return;
      }
    }
    if (this.expression != "") {
      this.expression =  this.expression + num;
    } else {
     this.input = this.input + num
     this.calcAnswer();
   }
  }

  getLastOperand() {
    let pos:number;
    console.log(this.input)
    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(pos+1))
    return this.input.substr(pos+1)
  }

  pressOperator(op: string) {
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }
    if (this.expression != "") {
       this.expression =  this.expression + op;
    } else {
      this.input = this.input + op
      this.calcAnswer();
    }
  }

  buildExpression(expression: string) {
    if (expression=="0") {
      if (this.input=="" ) {
        return;
      }
    }
    let exp = expression;
    this.expression = this.expression + exp;
  }

  clear() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
    else if(this.expression != "") {
      this.expression=this.expression.substr(0, this.expression.length-1)
    }
  }
 
  allClear() {
    this.result = '';
    this.input = '';
    this.expression = '';
    this.userValue = '';
  }

  calcAnswer() {

    let formula = this.input != "" ? this.input : this.expression;
 
    let lastKey = formula[formula.length - 1];
 
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    lastKey = formula[formula.length - 1];
 
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    console.log("Formula " +formula);
    this.result = eval(formula);
  }

  savetoDatabase() {
    this.calculator.valueX = this.userValue;
    this.calculator.valueY = this.result.toString();
    this.calculatorService.SaveCalculatorData(this.calculator).subscribe(res=>{  
      alert('Calculator data added successfully');  
      });
  }

  getAnswer() {
    debugger;
    if(this.expression != "") {
      if(this.userValue === "") {
        alert('Enter the value for X');
      } else {
        this.expression = this.expression.replace('x',this.userValue);
        this.expression = this.expression.substring(2,this.expression.length);
      }   
    }

    this.calcAnswer();
    this.savetoDatabase();
    
    if (this.input=="0") this.input="";
    if (this.expression == "0") this.expression = "";
  }

}
