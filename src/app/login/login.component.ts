import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//data="Happy Banking with us"
pdata="Enter Acc number"
//servicedata:any=""
pswMatch:boolean=false
acnoMatch:boolean=false
loginForm=this.fbk.group({
  //model for loginform
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]

})

// acno:string=""
// psw:string=""
//account declare chyanm before constructor,any-anytype variablewith empty string
// acno:any=""
constructor(private rout:Router,private ds:DataService,private fbk:FormBuilder){}
// login(){
//   alert("login clicked")
// }
// accno(event:any){
  //console.log(event.target.value);
  //this villikane for instance
  // this.acno=event.target.value
  // console.log(this.acno);
  ngOnInit(): void {
    //this.servicedata=this.ds.sData
    //console.log(this.servicedata);
    
  }
  login(){
    // console.log(this.acno);
    // console.log(this.psw);
   // this.ds.accessdata("data trasferred to servicedata ts file")


if(this.loginForm.valid){
  var path=this.loginForm.value
var acno=path.acno
var psw=path.psw
//api call
this.ds.loginApi(acno,psw).subscribe((response:any)=>{
  alert(`${response.uname} login success`)
  //store uname,acno in local storage
  localStorage.setItem("currentname",response.uname)
  localStorage.setItem("currentAcno",response.acno)
  localStorage.setItem("token",JSON.stringify(response.token))
  //console.log(response.token);
  
  this.rout.navigateByUrl("home")
},
response=>{
  alert(response.error)
}
)
}
 else{
  alert("invalid form")
 }
 
 }


  }
  

// pass(event:any){
//   console.log(event.target.value);

// }
//event binding using template rendering varibale
//#variable




