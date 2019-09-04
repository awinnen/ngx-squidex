import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AssetPipe } from './pipes/asset.pipe';
import { SquidexService } from './services/squidex.service';
import { SquidexAuthInterceptor } from './interceptors/squidex.interceptor';


@NgModule({
  declarations: [AssetPipe],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    { provide: SquidexService, useClass: SquidexService },
    { provide: HTTP_INTERCEPTORS, useClass: SquidexAuthInterceptor, multi: true }
  ],
  exports: [AssetPipe]
})
export class SquidexCMSModule { }
