import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jspdf from 'jspdf';
import { DataService } from 'service/data.service';
import 'jspdf-autotable';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  acno:any
  transactions:any=[]
  date:any
  searchkey:any=''
  constructor(private rout:Router,private ds:DataService){}
  ngOnInit(): void {
    //date
    this.date=new Date()

    //acno
    if (localStorage.getItem('currentAcno')){
      this.acno=localStorage.getItem('currentAcno')
    }
    this.ds.transactionHistory(this.acno).subscribe((result:any)=>{
      this.transactions=result;
    })
   
      
  }
  home(){
    this.rout.navigateByUrl("home")
  }
 searchkeychange(key:any){
  this.searchkey=key
 }
 convertpdf(){
  //CREATE AN OBJECT FOR jspdf
  var pdf=new jspdf()
//set column title
//pdfn enthano kodukkane athan title kodukkane
let col=[" Transaction Type",	"Amount","Account holder name",	"Date"]
//row-ippo empty akknm
let row:any=[]
//style set
//size -heading
pdf.setFontSize(16)
//title heading-x,y value evidnaea start akkane enn 
pdf.text('Account Statement',15,10)
//text color-(number ayitte kodukknm[99-black])
pdf.setTextColor(99)
//font size reset-bakki ullath
pdf.setFontSize(12)
//array of object-convert to array of array(nested)
var allItems=this.transactions
   for( var i of allItems){
    var rowdata=[i.type,i.amount,i.user,i.date]//oru array kitti obj
    row.push(rowdata)//row melleile empty ithilotte push akkm nested array
   }
// nested array convert to pdf
(pdf as any).autoTable(col,row,{startY:15})
// pdf opened in new window
pdf.output('dataurlnewwindow')
//pdf download
pdf.save('ministatement.pdf')
 }
}
