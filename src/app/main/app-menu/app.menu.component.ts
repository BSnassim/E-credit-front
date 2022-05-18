import { NgxPermissionsService } from 'ngx-permissions';
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
    public templateMenu: MenuItem[];

    userMenu = [];

    constructor(
        public app: AppComponent,
        public appMain: AppMainComponent,
        private translateService: TranslateService,
        private menuService: MenuService,
        private permissionService: NgxPermissionsService
    ) { }

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
                    {
                        label: "Administration",
                        icon: "pi pi-fw pi-list",
                        visible:this.permissionService.getPermissions().hasOwnProperty('ROLE_Administration'),
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
                    },
                    {
                        label: "Credit client",
                        icon: "pi pi-fw pi-money-bill",
                        visible:this.permissionService.getPermissions().hasOwnProperty('ROLE_Demande Credit Client'),
                        routerLink: ["/credit"],
                        items: [
                            {
                                label: "Demander un credit",
                                icon: "pi pi-fw pi-dollar",
                                routerLink: ["/credit/simulation"],
                            },
                            {
                                label: "Consulter vos credits",
                                icon: "pi pi-fw pi-briefcase",
                                routerLink: ["/credit/consultation"],
                            },
                        ],
                    },
                    {
                        label: "Traitement des demandes",
                        icon: "pi pi-fw pi-folder",
                        visible:this.permissionService.getPermissions().hasOwnProperty('ROLE_Traitement Demandes'),
                        routerLink: ["/credit"],
                        items: [
                            {
                                label: "Liste des dossiers",
                                icon: "pi pi-fw pi-folder-open",
                                routerLink: ["/credit/consultation"],
                            },
                            {
                                label: "Gestion des rendez-vous",
                                icon: "pi pi-fw pi-calendar-plus",
                                routerLink: ["/rdv/rendezvous"],
                            },
                        ],
                    }
                ],
            },
        ];

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
