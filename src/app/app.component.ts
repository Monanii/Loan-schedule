import { getLocaleDateFormat, getLocaleMonthNames } from '@angular/common';
import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { elementAt } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'Loancalculator';
  
    
  loanAmount: number =0;
  tenure: number = 0;
  interest: number = 0;
  emi: number = 0;
  outstandingAmount:number = 0;
  interestaccrued:number= 0;
  Interest:number = 0;
  top:number= 0;
  bottom:number= 0;
  sp:number = 0;
  schedules:any[]=[];
  Remaining:number=0;
  Principal:number= 0;
  Rate:number=0;
  Balance:number=0;
  amount:number=0;
  rate:number=0;
  monthly:number=0;
  table:any[]=[];
  Payments:any[]=[];
  header:string[]=[];
  month:string[]=[];


  cal(): void {
   
    this.Interest = Number(this.interest / 100) / 12;
    this.top = Number(Math.pow((1 + this.Interest), this.tenure));
    this.bottom = Number(this.top - 1);
    this.sp = Number(this.top / this.bottom);
    

    this.emi =(Math.round((this.loanAmount * this.Interest) * this.sp));
    this.outstandingAmount=(Math.round((this.emi*this.tenure)));
    this.interestaccrued=((this.outstandingAmount-this.loanAmount));
   

  } 
  Build(){

    this.amount= this.loanAmount;
    this.monthly= this.emi;
    this.rate = this.Interest;

    this.Rate= Number((Math.round(this.amount*this.rate)));
    this.Principal=Number((this.monthly-this.Rate));
    this.Balance=Number((this.amount-this.Principal)); 
    let month=1;

    const schedule = {
      Months:this.month,
      Principal:this.Principal,
      InterestPayable:this.Rate,
      Balance:this.Balance
    }

    this.table.push(schedule);
    
   while(this.Balance>=0)
   {
    this.Rate= Number((Math.round(this.Balance*this.rate)));
    this.Principal=Number((this.monthly-this.Rate));
    this.Balance=Number((this.Balance-this.Principal)); 
    month++;

    const schedule = {
      Principal:this.Principal,
      InterestPayable:this.Rate,
      Balance:this.Balance,
      Months:month
    }
    this.table.push(schedule);
    for ( let i=0; i < this.table.length; i++ ){
      
    }

   };
   
   

   //table
    this.header = ["Month","Principal","Interest","Balance"];
    
    this.schedules = [[],[],[],[]];
  

    for ( let i=0; i < this.table.length; i++ ) {
      
      this.schedules[0].push( this.table[i].Months);
      this.schedules[1].push( this.table[i].Principal);
      this.schedules[2].push( this.table[i].InterestPayable);
      this.schedules[3].push( this.table[i].Balance);
      
     }
     
     console.log(this.schedules)
     
     

     this.Payments=[
      {
        "Month":this.schedules[0],
        "Principal":this.schedules[1],
        "Interest":this.schedules[2],
        "Balance":this.schedules[3]
      }
       

     ];
     console.log(this.Payments)
    this.createRange(10);
     }
     
     createRange (Number: number){
      var items: Number[] = [];
      for(var i = 0; i < Number; i++){
        items.push(i);
      }
      console.log(items);
      // return items;
      return new Array(Number);
    }


}




