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
        this.dynamicView();
    }

    @HostListener('window:resize', ['$event'])
    dynamicView() {
        this.view = `${window.innerHeight - 128}px`;
    }
}
