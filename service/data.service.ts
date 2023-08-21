import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
//overloading header chyn
const options={
  headers:new HttpHeaders()//--ee headeril ann inni chyunnth
}
@Injectable({
  providedIn: 'root'
})

export class DataService {
 //sData="data inside service file"
  constructor(private http:HttpClient) { }
  // accessdata(data:any){
  //   console.log(data);
    
  // }
  //create token method for accesing other pages
  //method to add token in  api header
  //header overload chynm
  Createheader(){
    //to craete header using class http-httpheaders(headers name same ayrikm)
    const headers= new HttpHeaders()
    //access token from localstorage
    if(localStorage.getItem("token")){
      var token=JSON.parse(localStorage.getItem("token")||"")// parse matram token chyumpo ullath tokken illel empty ittu kodutath
      //add token to header
       options.headers=headers.append("access_token",token)
    }
    return options//call chyunth
  }
  signupApi(acno:any,uname:any,psw:any){
     const bodyData={
       acno,
       uname,
      psw   }
    return this.http.post('http://localhost:3005/bankuser/userregister',bodyData)
  }
  //login
  loginApi(acno:any,psw:any){
    const bodyData={
      acno,psw
  }
  return this.http.post('http://localhost:3005/bankuser/user-login',bodyData)
 }
 //get userprofile details
 getProfile(acno:any){
  return this.http.get('http://localhost:3005/bankuser/user-profile/'+acno,this.Createheader())
 }
 //get balance enquiry details
 getBalance(acno:any){
  return this.http.get('http://localhost:3005/bankuser/user-balance/'+acno,this.Createheader())
 }
 //moneytransfer
 //fromAcno,toAcno,fromAcnopsw,amount,Dateandtime
 moneyTransferApi(fromAcno:any,toAcno:any,psw:any,amount:any,date:any){
  const bodyData={fromAcno,toAcno,psw,amount,date}
  return this.http.post('http://localhost:3005/bankuser/money-transfer',bodyData,this.Createheader())
 }
 // transaction history api
 transactionHistory(acno:any){
  return this.http.get('http://localhost:3005/bankuser/user-history/'+acno,this.Createheader())
 }
 // delete history api
acDelete(acno:any){
  return this.http.delete('http://localhost:3005/bankuser/user-delete/'+acno,this.Createheader())
 }
}
