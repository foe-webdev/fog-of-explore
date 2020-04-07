import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
