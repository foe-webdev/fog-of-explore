import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import 'ol/ol.css';
import { Map, View, Geolocation, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
    map: Map;
    view: View;
    positionFeature: Feature;
    accuracyFeature: Feature;
    marker: string;
    vectorMarker: VectorLayer;

    constructor() { }

    ngOnInit(): void {
        this.marker = `
        <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
            fill="#0066cc"
            d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961
             192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
        </svg>`;
        this.initialiseView();
        this.initialiseMap();
        this.initialiseMarker();
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

    initialiseMarker(): void {
        this.positionFeature = new Feature();
        this.positionFeature.setStyle(new Style({
            image: new Icon({
                src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.marker)}`,
                scale: 0.3
            }),
        }));
    }

    getGeolocation(): void {
        const geolocation = new Geolocation({
            projection: this.view.getProjection(),
            trackingOptions: {
                enableHighAccuracy: true
            }
        });

        navigator.geolocation.getCurrentPosition((pos) => {
            const position = [pos.coords.longitude, pos.coords.latitude];
            const WebMercator = fromLonLat(position);
            this.accuracyFeature = new Feature();
            this.accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
            this.positionFeature.setGeometry(WebMercator ? new Point(WebMercator) : null);
            this.view.setCenter(WebMercator);
            this.showCurrentMarker();
        });
    }

    showCurrentMarker(): void {
        this.vectorMarker = new VectorLayer({
            map: this.map,
            source: new VectorSource({
                features: [this.accuracyFeature, this.positionFeature]
            })
        });
    }
}
