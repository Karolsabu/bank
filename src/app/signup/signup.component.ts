import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'service/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  pswMatch:boolean=false
signUpModelForm=this.fb.group({
  
  //model for signup form

  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
  psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
  cpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]

})

 constructor(private rout:Router,private fb:FormBuilder, private ds:DataService){}
 
 
 signup(){
  //alert("signup worked")
 
 var path=this.signUpModelForm.value
 var acno=path.acno
 var uname=path.uname
 var psw=path.psw
 var cpsw=path.cpsw
 if(this.signUpModelForm.valid){
  if(psw==cpsw){
    this.pswMatch=false
    //api call
    //subscribe use chyane for asyn in ts
    this.ds.signupApi(acno,uname,psw).subscribe((response:any)=>{
    //alert-usernte name villikunth response.uname vach ann
    alert(`${response.uname} registered`)
     this.rout.navigateByUrl("")
    },
    response=>{
      alert(response.error)
      
    }
    )
   }
   else{
    this.pswMatch=true
   }
 }
 else{
  alert("invalid form")
 }
 
 }

 }


