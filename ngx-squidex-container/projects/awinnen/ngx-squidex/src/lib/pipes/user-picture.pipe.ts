import { Pipe, PipeTransform } from '@angular/core';
import { SquidexCMSConfig } from '../interfaces/squidexCMSConfig';

@Pipe({
  name: 'sqUserPicture'
})
export class UserPicturePipe implements PipeTransform {

  constructor(private squidexConfig: SquidexCMSConfig) {}
  transform(userId: string): string {
    return `${this.squidexConfig.url}/api/users/${userId}/picture`;
  }

}
