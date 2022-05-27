import { Pipe, PipeTransform } from "@angular/core";
import { UserService } from "../Services/user.service";

@Pipe({
    name: "idUserTOUsername",
})
export class IdUserTOUsernamePipe implements PipeTransform {
    constructor(private userService: UserService) {}

    async transform(id: string) {
        const result: any = await this.userService.getUserById(id).toPromise();

        if (result) {
            console.log("rhhh", result.prenom);
            return result.prenom + " " + result.nom;
        } else {
            return null;
        }
    }
}
