import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import {MatListModule} from '@angular/material/list';
import { DiscoverySidenavComponent } from './discovery-sidenav/discovery-sidenav.component';
import { MobileTabsComponent } from './components/mobile-tabs/mobile-tabs.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        DiscoveryComponent,
        DiscoverySidenavComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        HttpClientModule,
        MatListModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
