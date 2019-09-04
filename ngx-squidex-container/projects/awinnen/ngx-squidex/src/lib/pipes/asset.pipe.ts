import { Pipe, PipeTransform } from '@angular/core';
import { SquidexCMSConfig } from '../interfaces/squidexCMSConfig';

@Pipe({
  name: 'sqAsset'
})
export class AssetPipe implements PipeTransform {

  constructor(private config: SquidexCMSConfig) {}
  transform(assetId: any, ...args: any[]): any {
    return `${this.config.url}/api/assets/${assetId}`;
  }

}
