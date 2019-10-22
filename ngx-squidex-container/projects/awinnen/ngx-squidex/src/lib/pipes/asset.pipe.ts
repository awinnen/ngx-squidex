import { Pipe, PipeTransform } from '@angular/core';
import { SquidexCMSConfig } from '../interfaces/squidexCMSConfig';

@Pipe({
  name: 'sqAsset'
})
export class AssetPipe implements PipeTransform {

  constructor(private config: SquidexCMSConfig) { }
  transform(assetId: any, params: any): any {
    const query = params ? '?' + Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&') : '';
    return `${this.config.url}/api/assets/${assetId}${query}`;
  }

}
