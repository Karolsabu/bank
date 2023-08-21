import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'service/data.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = ''
  acno: any
  profileData: any = {}
  balance: any = {}
  message:any=''
  status:any=true
  shareAcno:any=''
  //model form for money transfer
  moneyTransferform = this.fb.group({
    toAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
  })
  constructor(private rout: Router, private ds: DataService, private fb: FormBuilder,private datepipe: DatePipe) { }
  ngOnInit(): void {
    if (!localStorage.getItem("currentAcno")) {
      alert("please login first")
      this.rout.navigateByUrl("")

    }
    if (localStorage.getItem("currentname")) {
      this.user = localStorage.getItem("currentname")
      console.log(this.user);

    }
  }
  logout() {
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentuname')

    this.rout.navigateByUrl("")
  }
  statement(){
    this.rout.navigateByUrl("statement")
  }
  profileView() {
    if (localStorage.getItem("currentAcno")) {
      this.acno = localStorage.getItem("currentAcno")
      //console.log(this.acno);

    }
    this.ds.getProfile(this.acno).subscribe((response: any) => {
      console.log(response);

      this.profileData = response

    })

  }
  Balancedetails() {
    if (localStorage.getItem("currentAcno")) {
      this.acno = localStorage.getItem("currentAcno")
      // console.log(this.acno);

    }
    this.ds.getBalance(this.acno).subscribe((response: any) => {
      this.balance = response
    })



  }
  transfer() {
    if (this.moneyTransferform.valid) {
      //from acno
      if (localStorage.getItem("currentAcno")) {
        this.acno = localStorage.getItem("currentAcno")
        //console.log(this.acno);

      }
      //path
      var path = this.moneyTransferform.value


      //toaccno
      var toAcno = path.toAcno
      //console.log(toAcno);
      //psw
      var psw = path.psw
      //console.log(psw);
      //amont
      var amount = path.amount
      //console.log(amount);
      //date-class ayitte create chynm,date ann clse
      var DateTime=new Date()
      //console.log(DateTime);
      var dateData=this.datepipe.transform(DateTime,'short')
      //console.log(dateData);
      //api call
      this.ds.moneyTransferApi(this.acno,toAcno,psw,amount,dateData).subscribe((result:any)=>{
        this.message=result.message
        this.status=true
        //console.log(this.message);
        
         
      },
      result=>{
        this.message=result.error.message
        this.status=false
        //console.log(this.message);
        
        
        
      })
    }
else{
  this.message="Invalid form"
  this.status=false
  
  //console.log(this.message);
}

  }
  //delete account
  DeleteAc(){
    if(localStorage.getItem('currentAcno')){
     this.shareAcno=localStorage.getItem('currentAcno')
    }
  }
  cancel(){
    this.shareAcno=""
  }
  deleteaccount(event:any){
    this.ds.acDelete(event).subscribe((result:any)=>{
      alert(`${event}deleted succesfully`)
      this.logout()//same logout fn villikum
    })

  }
}
