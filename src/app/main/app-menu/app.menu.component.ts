import { User } from "src/app/models/user";
import { TokenService } from "./../../auth/services/token.service";
import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../app.component";
import { AppMainComponent } from "../app-main/app.main.component";
import { TranslateService } from "@ngx-translate/core";
import { MenuService } from "./app.menu.service";
import { MenuItem } from "primeng/api";

@Component({
    selector: "app-menu",
    templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
    public templateMenu: any[];

    userMenu = [];

    constructor(
        public app: AppComponent,
        public appMain: AppMainComponent,
        private translateService: TranslateService,
        private menuService: MenuService,
        private tokenService: TokenService
    ) {}

    ngOnInit() {
        // this.loadMenu();
        this.templateMenu = [
            {
                label: "Liste des menus",
                icon: "pi pi-home",
                items: [
                    {
                        label: "Dashboard",
                        icon: "pi pi-fw pi-home",
                        routerLink: ["/"],
                    },
                ],
            },
        ];
        this.tokenService.getUser().subscribe((data) => {
            data.profil.habilitations.forEach((e) => {
                if (e.libelle == "ROLE_Administration") {
                    this.templateMenu[0].items.push({
                        label: "Administration",
                        icon: "pi pi-fw pi-list",
                        routerLink: ["/administration"],
                        items: [
                            {
                                label: "Gestion des utilisateurs",
                                icon: "pi pi-fw pi-users",
                                routerLink: ["/administration/users"],
                            },
                            {
                                label: "Gestion des profils",
                                icon: "pi pi-fw pi-exclamation-triangle",
                                routerLink: ["/administration/profils"],
                            },
                        ],
                    });
                }

                if (e.libelle == "ROLE_Demande Credit Client") {
                    this.templateMenu[0].items.push({
                        label: "Credit client",
                        icon: "pi pi-fw pi-money-bill",
                        routerLink: ["/credit"],
                        items: [
                            {
                                label: "Demander un credit",
                                icon: "pi pi-fw pi-money-bill",
                                routerLink: ["/credit/demande"],
                            },
                            {
                                label: "Consulter vos credits",
                                icon: "pi pi-fw pi-money-bill",
                                routerLink: ["/credit/consultation"],
                            },
                        ],
                    });
                }

                if (e.libelle == "ROLE_Traitement Demandes") {
                    this.templateMenu[0].items.push({
                        label: "Traitement des demandes",
                        icon: "pi pi-fw pi-folder",
                        routerLink: ["/credit"],
                        items: [
                            {
                                label: "Liste des dossiers",
                                icon: "pi pi-fw pi-folder-open",
                                routerLink: ["/credit/consultation"],
                            },
                            {
                                label: "Liste des rendez-vous",
                                icon: "pi pi-fw pi-calendar",
                                routerLink: ["/"],
                            },
                            {
                                label: "Gestion des rendez-vous",
                                icon: "pi pi-fw pi-calendar-plus",
                                routerLink: ["/administration/rendez-vous"],
                            },
                        ],
                    });
                }
            });
        });

        this.userMenu = this.templateMenu;
        //Place here static menu items
    }

    loadMenu(): void {
        //Place here menu items loading
        /*this.menuService.loadMenu().subscribe((response: any) => {
           const menuItems = response.content as MenuItem[];
           this.translateService.get('menu').subscribe((translatedMenu: any) => {
                // Accept o=menu with depth = 3 !
                menuItems.forEach((menuItem) => {
                    menuItem = this.deleteInvalidItems(menuItem);
                    delete menuItem.routerLink;
                    menuItem.label = translatedMenu[menuItem.label];
                    menuItem.items?.forEach((childMenuItem) => {
                        // tslint:disable-next-line:max-line-length
                        childMenuItem = this.deleteInvalidItems(childMenuItem);
                        childMenuItem = this.correctInvalidRouterLink(childMenuItem);
                        childMenuItem.label = translatedMenu[childMenuItem.label];
                        childMenuItem.items?.forEach(grandChildMenuItem => {
                            // tslint:disable-next-line:max-line-length
                            grandChildMenuItem = this.deleteInvalidItems(grandChildMenuItem);
                            grandChildMenuItem = this.correctInvalidRouterLink(grandChildMenuItem);
                            grandChildMenuItem.label = translatedMenu[grandChildMenuItem.label];
                        });
                    });
                });
                this.userMenu = menuItems.concat(this.templateMenu);
            });
        });*/
    }
    /*correctInvalidRouterLink(menuItem: MenuItem): MenuItem {
       if (!menuItem.routerLink || menuItem.routerLink === [null] || menuItem.routerLink.length === 0){
           delete menuItem.routerLink;
       }else{
           menuItem.routerLinkActiveOptions = {exact: true};
       }
       return menuItem;
   }
   deleteInvalidItems(menuItem: MenuItem): MenuItem{
       if (!menuItem.items || menuItem.items.length === 0 || menuItem.items === [null]){
           delete menuItem.items;
       }
       return menuItem;
   }*/
}
