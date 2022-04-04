import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  languages = [];
  currentLanguage: string;
  @Output() languageChange = new EventEmitter<string>();
  @Input() customStyle: any;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
      this.loadLanguages();
  }

    loadLanguages(): void{
       this.translateService.currentLang ? this.currentLanguage = this.translateService.currentLang : this.currentLanguage = this.translateService.getDefaultLang();
       this.languages = ['en', 'fr'];
    }

    changeLanguage() {
        console.log(this.translateService.currentLang);
        this.translateService.use(this.currentLanguage);
        this.languageChange.emit(this.currentLanguage);
    }

}
