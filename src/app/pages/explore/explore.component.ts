import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
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
