import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';

import {FormulaProvider} from '../../providers/formula/formula';

/**
 * Generated class for the DosageRulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-dosage-rules',
    templateUrl: 'dosage-rules.html',
})
export class DosageRulesPage {

    rule: any;
    value: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private viewCtrl: ViewController,
                private alertCtrl: AlertController,
                private formulaProvider: FormulaProvider) {

    }

    ionViewDidLoad() {

    }

    close() {
        this.viewCtrl.dismiss();
    }

    applyRule(rule) {
        this.formulaProvider.dosageRule = rule;
        this.formulaProvider.dosageValue = this.value;

        let prompt = this.alertCtrl.create({
            title: 'Dosage Rule',
            message: "The rule has been applied to your formula.",
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        this.viewCtrl.dismiss();
                    }
                }
            ]
        });
        prompt.present();
    }
}
