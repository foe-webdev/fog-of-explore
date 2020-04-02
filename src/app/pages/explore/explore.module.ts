import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { MapComponent } from '../../components/map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [
        ExploreComponent,
        MapComponent
    ],
    imports: [
        CommonModule,
        ExploreRoutingModule,
        NgxMapboxGLModule.withConfig({
            accessToken: environment.MAP_PUBLIC_KEY,
            geocoderAccessToken: environment.MAP_PUBLIC_KEY
        })
    ]
})
export class ExploreModule { }
