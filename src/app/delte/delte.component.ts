import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delte',
  templateUrl: './delte.component.html',
  styleUrls: ['./delte.component.css']
})
export class DelteComponent implements OnInit {
  //create variable to accept data from parent component
  @Input()childAcno:String|undefined
  //new event create chyt eventemitter
  @Output() onCancel=new EventEmitter()
   @Output()onDelete=new EventEmitter()
  constructor(){
    
  }
ngOnInit(): void {
  
  
}
noclick(){
    this.onCancel.emit()
}
acdelete(){
 this.onDelete.emit(this.childAcno)//ith dollaremit ann data value kodukkan pattum
}
}
