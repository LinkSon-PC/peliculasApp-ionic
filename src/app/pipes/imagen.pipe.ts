import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string|null, size: string = 'w500'): string {
    if (!img) {
      return '';
    }

    const imgUrl = `${URL}/${size}/${img}`;
    //console.log(imgUrl);
    
    return imgUrl;
  }

}
