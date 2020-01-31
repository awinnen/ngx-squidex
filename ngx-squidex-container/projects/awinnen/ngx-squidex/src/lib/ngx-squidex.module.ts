import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AssetPipe } from './pipes/asset.pipe';
import { SquidexService } from './services/squidex.service';
import { SquidexAuthInterceptor } from './interceptors/squidex.interceptor';
import { UserPipe } from './pipes/user.pipe';
import { UserPicturePipe } from './pipes/user-picture.pipe';


@NgModule({
  declarations: [AssetPipe, UserPipe, UserPicturePipe],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    { provide: SquidexService, useClass: SquidexService },
    { provide: HTTP_INTERCEPTORS, useClass: SquidexAuthInterceptor, multi: true }
  ],
  exports: [AssetPipe, UserPipe, UserPicturePipe]
})
export class SquidexCMSModule { }
