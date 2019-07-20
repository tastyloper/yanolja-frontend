import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SubTitleService } from 'src/app/core/services/sub-title.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  reservationForm: FormGroup;

  constructor(
    private subTitleService: SubTitleService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '예약/결제';
    this.subTitleService.pagaDescription = '간편하게 예약하고 졀제하세요!';

    this.reservationForm = this.fb.group({
      bookerName: ['', Validators.required],
      bookerPhoneNum: ['', [
        Validators.required,
        Validators.pattern('(^01[0-9]{1})([0-9]{3,4})([0-9]{4})')
      ]],
      howToVisit: ['', Validators.required],
      billing: ['신용카드 결제', Validators.required],
      checkGroup: this.fb.group({
        allAgree: [false],
        termsOfUse: [false, Validators.pattern('true')],
        cancelPolicy: [false, Validators.pattern('true')],
        thirdParty: [false, Validators.pattern('true')]
      })
    });
    this.allAgree.valueChanges.subscribe(v => {
      console.log(v);
      this.termsOfUse.setValue(v);
      this.cancelPolicy.setValue(v);
      this.thirdParty.setValue(v);
      console.log(this.termsOfUse);
    });
    console.dir(this.reservationForm);
  }

  onSubmit() {

  }

  get bookerName() {
    return this.reservationForm.get('bookerName');
  }

  get bookerPhoneNum() {
    return this.reservationForm.get('bookerPhoneNum');
  }

  get howToVisit() {
    return this.reservationForm.get('howToVisit');
  }

  get billing() {
    return this.reservationForm.get('billing');
  }

  get checkGroup() {
    return this.reservationForm.get('checkGroup');
  }

  get allAgree() {
    return this.checkGroup.get('allAgree');
  }

  get termsOfUse() {
    return this.checkGroup.get('termsOfUse');
  }

  get cancelPolicy() {
    return this.checkGroup.get('cancelPolicy');
  }

  get thirdParty() {
    return this.checkGroup.get('thirdParty');
  }
}
