import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.component.html',
    styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
    view: string;

    constructor() { }

    ngOnInit(): void {
        this.resizeMap();
    }

    @HostListener('window:resize', ['$event'])
    resizeMap() {
        this.view = `${window.innerHeight - 128}px`;
    }
}
