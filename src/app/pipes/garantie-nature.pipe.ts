import { Pipe, PipeTransform } from '@angular/core';
import { CreditFormService } from '../Services/credit-form-service.service';

@Pipe({
  name: 'garantieNature'
})
export class GarantieNaturePipe implements PipeTransform {

  constructor(private creditService: CreditFormService) {

  }

  transform(value: number, ...args: unknown[]): any {
    return this.getNatureGarantie(value);
  }

  async getNatureGarantie(value: number){
    let result : string;
    if (value != null){
    result =(await this.creditService.getNatureGarantieById(value).toPromise()).libelleNature}
    return result;
  }

}
