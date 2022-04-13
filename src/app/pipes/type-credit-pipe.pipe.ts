import { CreditFormService } from 'src/app/Services/credit-form-service.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Credit } from '../models/credit/typeCredit';

@Pipe({
  name: 'typeCredit'
})
export class TypeCreditPipePipe implements PipeTransform {

  constructor(private creditService: CreditFormService) {

  }

  transform(value: number, ...args: unknown[]): any {
    return this.getLibCredit(value);
  }

  async getLibCredit(value){
    let result =(await this.creditService.getTypeCreditById(value).toPromise()).libcredit
    return result;
  }

}
