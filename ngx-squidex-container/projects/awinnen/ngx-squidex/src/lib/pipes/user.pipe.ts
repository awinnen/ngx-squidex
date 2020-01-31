import { Pipe, PipeTransform } from '@angular/core';
import { SquidexUser } from '../interfaces/squidexUser';
import { Observable } from 'rxjs';
import { SquidexService } from '../services/squidex.service';

@Pipe({
  name: 'sqUser'
})
export class UserPipe implements PipeTransform {

  constructor(private squidexService: SquidexService) {}

  public transform(id: string): Observable<SquidexUser> {
    return this.squidexService.getUserById(id);
  }

}
