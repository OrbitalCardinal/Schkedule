import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { AccesoModule } from './acceso/acceso.module';
import { MainPageModule } from './main-page/main-page.module';
import { NuevoUsuarioModule } from './nuevo-usuario/nuevo-usuario.module';
import { SeleccionUsuarioModule } from './seleccion-usuario/seleccion-usuario.module';
import { EntrarModule } from './entrar/entrar.module';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    MainPageModule,
    AccesoModule,
    NuevoUsuarioModule,
    SeleccionUsuarioModule,
    EntrarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
