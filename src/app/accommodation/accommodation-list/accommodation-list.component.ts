import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
// StayListService import
import { StayListService } from 'src/app/core/services/stay-list.service';
// Interface of Stay import
import { Stay } from '../../core/types/stay.interface'

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit {

  locale:string = 'ko';
  locales = listLocales();

  bsValue = new Date();
  bsRangeValue: Date[];
  navClicked: boolean = false;
  datePickerConfig:Partial<BsDatepickerConfig>;
  category: string;
  selectRegion: string = `강남/역삼/선릉/삼성`;
  person:boolean = false;
  type:boolean = false;
  location:boolean = false;
  numberAdult: number = 2;
  numberChildren: number = 0;
  minDate: Date;
  maxDate: Date;
  searchBar = {
    type: '',
    location: '',
    date: '',
    member: ''
  }
  searchBarShow: string ;
  searchBarLocShow: string;
  searchBarDateShow: string;
  searchBarMemberShow: string;

  sstayList:object;

  searchParams;

  constructor(private route: ActivatedRoute, private localeService: BsLocaleService, private stayList: StayListService) { 

    this.localeService.use(this.locale);

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
    
    this.getList();
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => { 
      this.category = params.category;
      this.searchBarShow = this.category;
      return;
    })
    this.searchBarShow = this.category;

    this.searchBarShow = this.searchBar.type ? this.searchBar.type : '숙박유형';
    this.searchBarLocShow = this.searchBar.location ? this.searchBar.location : '지역을 고르세요';
    
    // this.bsRangeValue = [this.bsValue, this.maxDate]
  }

  getList() {
    const payLoad = {
      // selectRegion: '강남',
      // category: '모텔',
      // personnel: 2,
      // requestCheckIn: '2019-07-01+22:00:00'
    }

    let slist = this.sstayList;
    this.stayList.getAList(payLoad).subscribe(list => this.sstayList = Object.assign(slist, list));
    console.log('list',this.sstayList);
  }

  toggle(option:string) {
    if(option === "member") {
      this.type = false;
      this.location = false;
      this.person = this.person ? false : true 
    } else if(option === "type") {
      this.person = false;
      this.location = false;
      this.type = this.type  ? false : true
    }
    else if(option === "location") {
      this.person = false;
      this.type = false;
      this.location = this.location  ? false : true
    } else if(option === "calendar") {
      this.person = false;
      this.type = false;
      this.location = false;
    }
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
    this.person = false;
    this.location = false;
    this.type = false;

    this.searchParams = {
      category: this.category,
      personnel: this.numberAdult,
      selectRegion: this.selectRegion
    }
    console.log(this.searchParams);
    console.log([this.bsValue.toDateString(), this.maxDate]);
  }

  selectType(type:string) {
    this.toggle('type');
    this.searchBar.type = type;
    this.searchBarShow = type === 'motel' ? '모텔' : (type === 'hotel' ?  '호텔' : (type === 'guestHouse' ?  '게스트하우스' : (type === 'pension' ? '펜션' : '숙박종류')));
  }

  selectLoc(item) {
    this.toggle('location');
    this.selectRegion = item.value;
    this.searchBarLocShow = item.value;
  }

  selectDate(dateRange) {
    // console.log(this.bsRangeValue[0]);
  }

  likeAction(e:Event) {
    e.preventDefault();
    e.stopPropagation();
    console.log('123');
  }
}
