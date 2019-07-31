import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'html2Text'
})
export class Html2TextPipe implements PipeTransform {

  transform(text): any {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }

}
