import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AppMainComponent} from '../app-main/app.main.component';
import {TranslateService} from '@ngx-translate/core';
import {MenuService} from './app.menu.service';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    public templateMenu: any[];
    userMenu = [];
    constructor(public app: AppComponent, public appMain: AppMainComponent, private translateService: TranslateService, private menuService: MenuService) {}

    ngOnInit() {
     // this.loadMenu();

     this.templateMenu = [
         {label: 'Template', icon: 'pi pi-home', items: [
                 {
                     label: 'Favorites', icon: 'pi pi-home',
                     items: [
                         {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                     ]
                 },
                 {
                     label: 'Administration', icon: 'pi pi-fw pi-id-card', routerLink: ['/administration'],
                     items: [
                         {label: 'Gestion des profils', icon: 'pi pi-fw pi-id-card', routerLink: ['/administration/profils']},
                         {label: 'Gestion des habilitation', icon: 'pi pi-fw pi-id-card', routerLink:['/administration/habilitations']}
                     ]
                 },
                 {
                     label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                     items: [
                         {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                         {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                         {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
                         {label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate']},
                         {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                         {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                         {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                         {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                         {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                         {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                         {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                         {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
                         {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                         {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                         {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                         {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
                     ]
                 },
                 {
                     label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
                     items: [
                         {label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display']},
                         {label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation']},
                         {label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox']},
                         {label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons']},
                         {label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text']},
                         {label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets']},
                         {label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid']},
                         {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing']},
                         {label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography']}
                     ]
                 },
                 {
                     label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
                     items: [
                         {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
                         {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
                         {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
                         {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                         {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login']},
                         {label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice']},
                         {label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help']},
                         {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error']},
                         {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound']},
                         {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access']},
                         {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
                     ]
                 },
                 {
                     label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
                     items: [
                         {
                             label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                             items: [
                                 {
                                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                                     items: [
                                         {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left'},
                                         {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left'},
                                         {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left'},
                                     ]
                                 },
                                 {
                                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                                     items: [
                                         {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left'}
                                     ]
                                 },
                             ]
                         },
                         {
                             label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                             items: [
                                 {
                                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                                     items: [
                                         {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left'},
                                         {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left'},
                                     ]
                                 },
                                 {
                                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                                     items: [
                                         {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left'},
                                     ]
                                 },
                             ]
                         }
                     ]
                 },
                 {
                     label: 'Start', icon: 'pi pi-fw pi-download',
                     items: [
                         {
                             label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
                         },
                         {
                             label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
                         }
                     ]
                 }
             ]}
        ];
        this.userMenu = this.templateMenu;
        //Place here static menu items
    }

    loadMenu(): void{
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
