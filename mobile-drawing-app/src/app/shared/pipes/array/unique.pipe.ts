// WS Author
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'unique', pure: false})

export class UniquePipe implements PipeTransform {
    transform(value: any, keyname: any): any {
        const output = [];
        const keys = [];
        if (value !== undefined && value !== null) {
            for (let cpt = 0, ln = value.length; cpt < ln; ++cpt) {
                const key = value[cpt][keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(value[cpt]);
                }
            }
            return output;
        }
        return output;
    }
}

// import { Pipe, PipeTransform } from '@angular/core';
// import * as _ from 'lodash';

// @Pipe({
//   name: 'unique',
//   pure: false
// })

// export class UniquePipe implements PipeTransform {
//     transform(value: any): any{
//         if(value!== undefined && value!== null){
//             return _.uniqBy(value, 'categoryname');
//         }
//         return value;
//     }
// }


// import {PipeTransform, Pipe} from '@angular/core';

// @Pipe({name: 'unique'})
// export class UniquePipe implements PipeTransform {

//   transform(input: any): any[] {
//     return Array.isArray(input)
//       ? input.filter((e, i) => input.indexOf(e) === i)
//       : input;
//   }
// }
