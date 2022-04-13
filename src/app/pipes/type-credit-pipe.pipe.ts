import { CreditFormService } from 'src/app/Services/credit-form-service.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Credit } from '../models/credit/typeCredit';

@Pipe({
  name: 'typeCredit'
})
export class TypeCreditPipePipe implements PipeTransform {

  listTypesCredit: Credit[] = [];

  constructor(private creditService: CreditFormService) { }

  async getTypes() {
    const result = await this.creditService.getTypeCreditAPI().toPromise()

    return result;
}

  transform(value: number, ...args: unknown[]): string {
    this.getTypes().then((result)=>{
      this.listTypesCredit = result;
    });
    let credit = this.listTypesCredit.find(
      (i) => i.idType === value
    );
    return credit?.libcredit;
  }

}
