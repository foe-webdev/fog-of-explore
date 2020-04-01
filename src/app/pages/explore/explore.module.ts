import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { MapComponent } from '../../components/map/map.component';

@NgModule({
    declarations: [
        ExploreComponent,
        MapComponent
    ],
    imports: [
        CommonModule,
        ExploreRoutingModule
    ]
})
export class ExploreModule { }
