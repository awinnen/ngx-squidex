# @awinnen/ngx-squidex

Angular Library for headless CMS [Squidex](https://squidex.io/)

Changelog: [https://github.com/awinnen/ngx-squidex](https://github.com/awinnen/ngx-squidex)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)


## Installation

Install the npm module:

```sh
npm install @awinnen/ngx-squidex --save
```


## Usage

#### 1. Import the `SquidexCMSModule`:

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { SquidexCMSModule } from  '@awinnen/ngx-squidex';

@NgModule({
    imports: [
        BrowserModule,
        SquidexCMSModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2. Provide `SquidexCMSConfig` in your AppModule

You must provide an SquidexCMSConfig instance. Set `clientId`, `clientSecret`, `url` and `app` fields.
Optionally, you can provide a defaultRequestContext which will set some headers to retrieve only certain languages. Refer to Squidex [docs](https://docs.squidex.io/concepts/localization)
```ts
import { SquidexCMSConfig } from  '@awinnen/ngx-squidex';

@NgModule({
	providers: [
		{
			provide:  SquidexCMSConfig,
			useValue:  Object.assign(new SquidexCMSConfig(), {
				clientId:  "my-squidex-app:public",
				clientSecret:  "2ec71a67-51ec-4130-8c31-b93469c24efa",
				url:  "https://cloud.squidex.io",
				app:  "my-squidex-app",
				defaultRequestContext: {
					flatten:  true,
					languages: ['de']
				}
			} as  Partial<SquidexCMSConfig>)
		}
	]
```

#### 3. Use `SquidexService` to Query your CMS

```ts
import { SquidexService, SquidexResponse } from  '@awinnen/ngx-squidex';

@Injectable({ providedIn: "root" })
export class DataService {
	constructor(private squidexService: SquidexService) {}
	
	public queryWithContext<T>(schema:  string): Observable<SquidexResponse<T>> {
		return  this.squidexService.query<T>(schema, { 
			flatten:  true, 
			languages: ["en", "de"] 
		});
	} 
}
```