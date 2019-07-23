import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit {
  navClicked: boolean = false;
  datePickerConfig:Partial<BsDatepickerConfig>;
  category: string;
  person:boolean = false;
  type:boolean = false;
  location:boolean = false;
  numberAdult: number = 2;
  numberChildren: number = 0;
  minDate: Date;
  maxDate: Date;

  constructor(private route: ActivatedRoute) { 

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 14);

    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-blue',
        dateInputFormat: 'YYYY-MM-DD',
        rangeInputFormat:'YYYY-MM-DD',
        showWeekNumbers: false,
        minDate : this.minDate,
        // maxDate : this.maxDate
      });
  }

  ngOnInit() {


    this.route.queryParams
    .subscribe(params => { 
      this.category = params.category;
      console.log(this.category , "dddd");
      return;
    })
  }

  toggle(option:string) {
    console.log(this.navClicked , this.person);
    if(option === "member") this.person = this.person ? false : true ;
    if(option === "type") this.type = this.type  ? false : true;
    if(option === "location") this.location = this.location  ? false : true;
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

  submitNav() {
    console.log('submitBtn')
  }

}
