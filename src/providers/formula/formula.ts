import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { DispensaryProvider} from '../dispensary/dispensary';

/*
  Generated class for the FormulaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormulaProvider {

    apiURL: string = 'http://app.naturopathictools.com.au/api/';
    formulaHerbs: any = [];
    dosageRule: any = 'none';
    dosageValue: any = 0;

    constructor(public http: Http, private dispensaryProvider: DispensaryProvider) {

    }

    addHerb(herb) {
        this.formulaHerbs.push(herb);
    }

    storeFormula(formula, dosages) {
        let postData = {};

        postData['formula'] = formula;
        postData['dosages'] = dosages;
        postData['formula']['dosage_rule'] = this.dosageRule != null ? this.dosageRule : 'none';
        postData['formula']['dosage_value'] = this.dosageValue;
        postData['formula']['markup'] = '15';

        console.log(postData);

        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'create/formula', postData)
                .map(res => res.json())
                .subscribe((response) => {
                        console.log(response);
                        resolve(response);
                    },
                    err => {
                        console.log(err);
                    });
        });
    }
}
