import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverySidenavComponent } from './discovery-sidenav.component';

describe('DiscoverySidenavComponent', () => {
  let component: DiscoverySidenavComponent;
  let fixture: ComponentFixture<DiscoverySidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverySidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
