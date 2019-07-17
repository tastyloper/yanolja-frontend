import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit {

  person:boolean = false;
  numberAdult: number = 2;
  numberChildren: number = 0;

  constructor() { }

  ngOnInit() {
  }

  toggle(event) {
    this.person = this.person ? false : true ;
  }

  minus(person:string) {
    if((person === 'adult' && this.numberAdult == 0) || (person === 'children' && this.numberChildren == 0))  return;
    if(person === 'adult') this.numberAdult = this.numberAdult - 1;
    else if(person === 'children') this.numberChildren = this.numberChildren - 1;
  }

  plus(person:string) {
    if(person === 'adult') this.numberAdult = this.numberAdult + 1;
    else if(person === 'children') this.numberChildren = this.numberChildren + 1;
  }

}
