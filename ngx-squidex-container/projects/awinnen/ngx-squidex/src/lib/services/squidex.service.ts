import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SquidexCMSConfig } from '../interfaces/squidexCMSConfig';
import { SquidexRequestContext } from '../interfaces/squidexRequestContext';
import { SquidexResponse } from '../interfaces/squidexResponse';

@Injectable()
export class SquidexService {

  constructor(private httpClient: HttpClient, private squidexConfig: SquidexCMSConfig) {
    if(!(squidexConfig instanceof SquidexCMSConfig)) {
      throw new Error("squidexConfig is not instanceof SquidexCMSConfig");
    }
   }

  public query<T>(url: string, context: SquidexRequestContext = this.squidexConfig.defaultRequestContext): Observable<SquidexResponse<T>> {
    let headers = new HttpHeaders();
    if (context) {
      if (context.flatten) {
        headers = headers.append('X-Flatten', `${true}`);
      }
      if (context.languages) {
        headers = headers.append('X-Languages', context.languages.join(','))
      }
    }
    return this.httpClient.get<SquidexResponse<T>>(`${this.squidexConfig.url}/api/content/${this.squidexConfig.app}/${url}`, { headers });
  }

  public create(schema: string, data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.squidexConfig.url}/api/content/${this.squidexConfig.app}/${schema}`, data);
  }

  public update(schema: string, id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.squidexConfig.url}/api/content/${this.squidexConfig.app}/${schema}/${id}`, data);
  }

  public delete(schema: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.squidexConfig.url}/api/content/${this.squidexConfig.app}/${schema}/${id}`);
  }

  public retrieveToken(): Observable<string> {
    const body = `grant_type=client_credentials&client_id=${this.squidexConfig.clientId}&client_secret=${this.squidexConfig.clientSecret}&scope=squidex-api`;
    return this.httpClient.post<any>(`${this.squidexConfig.url}/identity-server/connect/token`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(
      map(response => {
        this.squidexConfig.storageGetterFn().setItem(this.squidexConfig.storageKey, response.access_token)
        return response;
      })
    );
  }
}
