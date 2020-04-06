import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
    map: mapboxgl.Map;

    constructor() { }

    ngOnInit(): void {
        this.initialiseMap();
        this.geocoder();
        this.geoLocate();
        this.navigationControls();
    }

    initialiseMap(): void {
        mapboxgl.accessToken = environment.MAP_KEY;
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/foewebdev/ck8ipc31333gk1inygvqx6o1u',
            center: [-3.1883, 55.9533],
            zoom: 12
        });
    }

    geoLocate(): void {
        this.map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );
    }

    geocoder(): void {
        this.map.addControl(
            new MapboxGeocoder({
                accessToken: environment.MAP_KEY,
                mapboxgl
            })
        );
    }

    navigationControls(): void {
        this.map.addControl(new mapboxgl.NavigationControl());
    }
}
