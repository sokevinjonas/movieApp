import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private translate: TranslateService, private modalController: ModalController) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    console.log();
  }
  async openLanguageModal() {
    const modal = await this.modalController.create({
      component: 'language-modal',
      cssClass: 'language-modal'
    });
    return await modal.present();
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
