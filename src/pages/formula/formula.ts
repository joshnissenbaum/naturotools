import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

import {EmailComposer} from '@ionic-native/email-composer';

import {DispensaryProvider} from '../../providers/dispensary/dispensary';

/**
 * Generated class for the FormulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
    selector: 'page-formula',
    templateUrl: 'formula.html',
})
export class FormulaPage {

    formula: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private  dispensaryProvider: DispensaryProvider,
                private emailComposer: EmailComposer,
                private loadingCtrl: LoadingController) {
        this.formula = this.navParams.get('formula');
    }

    ionViewDidLoad() {

    }

    getHerbs(formula) {
        if (formula.herbs != null) {
            let herbs = [];

            formula.herbs.forEach((herb) => {
                herbs.push({
                    'herb': this.dispensaryProvider.herbs.find((x => x.id == herb.herb_id)),
                    'dosage': herb.dosage
                });
            });

            console.log(herbs);

            return herbs;
        }
    }

    getBrandObject(result) {
        return this.dispensaryProvider.brands.find(brand => brand.id == result.brand_id);
    }

    getActions(result) {
        if (result != null) {
            let actions = [];

            result.actions.forEach((action) => {
                actions.push(this.dispensaryProvider.actions.find((x => x.id == action.action_id)));
            });

            return actions;
        }
    }

    getInteractions(result) {
        if (result != null) {
            return this.dispensaryProvider.herbs.find((x => x.id == result.id)).interactions;
        }
    }

    getFlags(result) {
        if (result != null) {
            return this.dispensaryProvider.herbs.find((x => x.id == result.id)).flags;
        }
    }

    email() {
        let email = {
            to: '',
            subject: 'Herbal Pro Prescription',
            body: document.getElementById('wrapper').innerHTML,
            isHtml: true
        };

        // Send a text message using default options
        this.emailComposer.open(email);
    }

    sharePDF() {
        let loading = this.loadingCtrl.create({
            spinner: 'crescent'
        });
        loading.present();

        cordova.plugins.pdf.htmlToPDF({
                data: '<html><head></head><body>' + document.getElementById('wrapper').innerHTML + '</body>',
                type: "share"
            },
            (sucess) => loading.dismiss(),
            (error) => { loading.dismiss(); console.log('error:', error); });
    };
}
