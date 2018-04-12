import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, AlertController} from 'ionic-angular';

import {FormulaProvider} from '../../providers/formula/formula';
import {DispensaryProvider} from '../../providers/dispensary/dispensary';

/**
 * Generated class for the FormulatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-formulate',
    templateUrl: 'formulate.html'
})
export class FormulatePage {

    formula: any;
    dosages: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private modalCtrl: ModalController,
                public formulaProvider: FormulaProvider,
                private alertCtrl: AlertController,
                public dispensaryProvider: DispensaryProvider) {
        this.formula = {};
        this.dosages = {};
    }

    ionViewDidLoad() {

    }

    dosageRules() {
        let modal = this.modalCtrl.create('DosageRulesPage');
        modal.present();

        modal.onDidDismiss((data) => {

        });
    }

    getBrandObject(herb) {
        return this.dispensaryProvider.brands.find(brand => brand.id == herb.brand_id);
    }

    getActions(herb) {
        if (herb != null) {
            let actions = [];

            herb.actions.forEach((action) => {
                actions.push(this.dispensaryProvider.actions.find((x => x.id == action.action_id)));
            });

            return actions;
        }
    }

    createFormula() {
        if (!this.formula['prac_notes']) {
            let alert = this.alertCtrl.create({
                title: 'Oops!',
                message: 'Please fill out the practitioner notes section. Add an expiry for the batch.',
                buttons: [
                    {
                        text: 'Ok',
                        role: 'cancel',
                        handler: () => {
                        }
                    }
                ]
            });

            alert.present();
            return;
        }

        this.formulaProvider.storeFormula(this.formula, this.dosages).then((response) => {
            this.navCtrl.push('FormulaPage', {
                formula: response
            });
        });
    }

    removeHerb(herb) {
        let alert = this.alertCtrl.create({
            title: 'Remove Herb',
            message: 'Are you sure you would like to remove this herb from your formula?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Remove',
                    handler: () => {
                        let index = this.formulaProvider.formulaHerbs.map(function(x){ return x.id; }).indexOf(herb.id);
                        this.formulaProvider.formulaHerbs.splice(index,1);
                    }
                }
            ]
        });

        alert.present();
    }
}
