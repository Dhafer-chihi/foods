import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LatLngTuple, map, Map, tileLayer } from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];
  @ViewChild('map', { static: true })
  mapRef !: ElementRef;
  map!: Map;
  constructor() { }

  ngOnInit(): void {
  }
  initilizeMap() {
    if (this.map) return;
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 2);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  }

}
