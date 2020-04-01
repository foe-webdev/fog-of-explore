import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import 'ol/ol.css';
import { Map, View, Geolocation } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
    map: Map;
    view: View;

    constructor() { }

    ngOnInit(): void {
        this.initialiseView();
        this.initialiseMap();
        this.getGeolocation();
    }

    initialiseView(): void {
        this.view = new View({
            center: [-354400, 7546000],
            zoom: 12
        });
    }

    initialiseMap(): void {
        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: this.view
        });
    }

    getGeolocation() {
        const geolocation = new Geolocation({
            projection: this.view.getProjection(),
            tracking: true,
            trackingOptions: {
                enableHighAccuracy: true
            }
        });

        geolocation.on('change', (evt) => {
            const pos = geolocation.getPosition();
            this.view.setCenter(pos);
        });
    }
}
