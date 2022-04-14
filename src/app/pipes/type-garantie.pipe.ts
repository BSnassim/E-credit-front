import { Pipe, PipeTransform } from '@angular/core';
import { CreditFormService } from '../Services/credit-form-service.service';

@Pipe({
  name: 'typeGarantie'
})
export class TypeGarantiePipe implements PipeTransform {

  constructor(private creditService: CreditFormService) {

  }

  transform(value: number, ...args: unknown[]): any {
    return this.getTypeGarantie(value);
  }

  async getTypeGarantie(value: number){
    let result : string;
    if (value != null){
    result =(await this.creditService.getTypeGarantieById(value).toPromise()).libType}
    return result;
  }

}
