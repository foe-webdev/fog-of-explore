import { Component, OnInit, ViewEncapsulation, Input, HostListener } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
    map: mapboxgl.Map;
    view: string;

    constructor(
        private mapService: MapService
    ) { }

    ngOnInit(): void {
        this.initialiseMap();
        this.geocoder();
        this.geoLocate();
        this.navigationControls();
        this.getPackageLayer();
    }

    @HostListener('window:resize', ['$event'])
    dynamicView() {
        this.view = `${window.innerHeight - 128}px`;
    }

    initialiseMap(): void {
        this.dynamicView();
        mapboxgl.accessToken = environment.MAP_KEY;
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/foewebdev/ck8puvvxj058m1ip8rrznk34c',
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
                mapboxgl,
                countries: 'gb',
                bbox: [-3.320618, 55.883784, -3.057632, 55.988396],
            })
        );
    }

    navigationControls(): void {
        this.map.addControl(new mapboxgl.NavigationControl());
    }

    getPackageLayer(): void {
        this.map.on('load', () => {
            this.mapService.getSelectedPackages().subscribe(data => this.packageLayer(data));
        });
    }

    packageLayer(data): void {
        const source = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: data
            }
        };
        console.log(source);
        this.map.addSource('packageSource', source);
        this.map.addLayer({
            id: 'packageSource',
            type: 'symbol',
            source: 'packageSource',
            layout: {
                'icon-image': '{icon}-15',
            }
        });
        this.map.on('click', 'packageSource', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup({ offset: 15 })
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(this.map);
        });

        this.map.on('mouseenter', 'packageSource', () => {
            this.map.getCanvas().style.cursor = 'pointer';
        });

        this.map.on('mouseleave', 'packageSource', () => {
            this.map.getCanvas().style.cursor = '';
        });
    }
}
