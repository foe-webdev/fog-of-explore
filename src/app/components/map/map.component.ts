import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
    zoom: number;
    style: string;
    center: number[];
    countries: string;

    constructor() { }

    ngOnInit(): void {
        this.initialiseMap();
    }

    initialiseMap(): void {
        this.zoom = 11;
        this.style = 'mapbox://styles/foewebdev/ck8ipc31333gk1inygvqx6o1u';
        this.center = [-3.1883, 55.9533];
        this.countries = 'gb';
    }
}
