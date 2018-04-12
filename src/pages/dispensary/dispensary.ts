import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, AlertController} from 'ionic-angular';

import {DispensaryProvider} from '../../providers/dispensary/dispensary';
import {FormulaProvider} from '../../providers/formula/formula';


/**
 * Generated class for the DispensaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-dispensary',
    templateUrl: 'dispensary.html'
})
export class DispensaryPage {

    brands: any;
    actions: any = [];
    herbs: any;
    loading: boolean = false;
    showSearch: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public dispensaryProvider: DispensaryProvider,
                public formulaProvider: FormulaProvider,
                private modalCtrl: ModalController,
                private alertCtrl: AlertController) {
        this.brands = [];
        this.showSearch = true;
    }

    ionViewDidLoad() {

    }

    expand(menu) {
        if (menu == 'search') {
            if (this.showSearch) {
                document.getElementById('search').classList.add('slideOutUp');
                this.showSearch = false;
            } else {
                //document.getElementById('search').classList.add('slideInDown');
                this.showSearch = true;
            }
        }
    }

    addActions(actions) {
        let modal = this.modalCtrl.create('AddActionsPage', { actions: actions });
        modal.present();

        modal.onDidDismiss((data) => {
            this.actions = data;
        });
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

    getActionName(action) {
        if (action != null) {
            return this.dispensaryProvider.actions.find((x => x.id == action)).action_name;
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

    searchDispensary() {
        this.loading = true;
        this.dispensaryProvider.searchDispensary(this.brands, this.actions).then((resolve) => {
            document.getElementById('search').classList.toggle('slideOutUp');
            this.showSearch = false;
            this.herbs = resolve;
            this.loading = false;
        });
    }

    addFormulaHerb(herb) {
        let alert = this.alertCtrl.create({
            title: '',
            message: 'Add this herb to your formula?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Add',
                    handler: () => {
                        this.formulaProvider.addHerb(herb);
                    }
                }
            ]
        });
        alert.present();
    }

    deleteAction(action) {
        let alert = this.alertCtrl.create({
            title: 'Delete Action',
            message: 'Are you sure you would like to remove this action from the formula?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        let index = this.actions.map(function(x){ return x; }).indexOf(action);
                        this.actions.splice(index,1);
                    }
                }
            ]
        });
        alert.present();
    }

    clearFormula() {
        let alert = this.alertCtrl.create({
            title: 'Wipe Formula',
            message: 'Are you sure you would like to clear/wipe this formula?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Wipe',
                    handler: () => {
                        this.actions = [];
                        this.brands = [];
                    }
                }
            ]
        });
        alert.present();
    }
}
