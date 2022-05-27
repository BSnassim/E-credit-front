import { Pipe, PipeTransform } from "@angular/core";
import { CreditFormService } from "../Services/credit-form-service.service";

@Pipe({
    name: "libPhase",
})
export class LibPhasePipe implements PipeTransform {
    constructor(private creditService: CreditFormService) {}

    async transform(id: number) {
        const result: any = await this.creditService
            .getPhaseById(id)
            .toPromise();

        if (result) {
            console.log("rhhh", result.etape);
            return result.etape;
        } else {
            return null;
        }
    }
}
