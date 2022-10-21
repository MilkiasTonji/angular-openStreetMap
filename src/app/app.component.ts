import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from './service/logger.service';
import * as Leaflet from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const initialData = {
  userName: "Miki",
  email: "mik@gmail.com",
  password: "password",
  unit: 'piece'
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'reactive-forms';

  userName: any = ""

  loginForm = this.fb.group({
    userName: [initialData.userName, Validators.required],
    email: [initialData.email, Validators.required],
    _password: [initialData.password, Validators.required],
    unit: ['piece', Validators.required]
  })

  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 12,
    center: new Leaflet.LatLng(43.530147, 16.488932)
  };


  constructor(private fb: FormBuilder, private loggerService: LoggerService) {
  }

  ngOnInit(): void {
    const provider = new OpenStreetMapProvider();

    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      autoCompleteDelay: 300,
      autoClose: true,
      showMarker: false,
    });
    const map = new Leaflet.Map('map');
    map.addControl(searchControl);
  }


  onSubmit() {
    console.log(this.loginForm.value)
  }

}



export const getLayers = (): Leaflet.Layer[] => {
  return [
    // Basic style
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as Leaflet.TileLayerOptions),
    // Pastel style, remove if you want basic style.
    new Leaflet.TileLayer('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key={your_key}', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    } as Leaflet.TileLayerOptions),
    ...getMarkers(),
    ...getRoutes(),
    ...getPolygons()
  ] as Leaflet.Layer[];
};

export const getMarkers = (): Leaflet.Marker[] => {
  return [
    new Leaflet.Marker(new Leaflet.LatLng(43.5121264, 16.4700729), {
      icon: new Leaflet.Icon({
        iconSize: [30, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
      }),
      title: 'Workspace'
    } as Leaflet.MarkerOptions),
    new Leaflet.Marker(new Leaflet.LatLng(43.5074826, 16.4390046), {
      icon: new Leaflet.Icon({
        iconSize: [30, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
      }),
      title: 'Riva'
    } as Leaflet.MarkerOptions),
  ] as Leaflet.Marker[];
};

export const getRoutes = (): Leaflet.Polyline[] => {
  return [
    new Leaflet.Polyline([
      new Leaflet.LatLng(43.5121264, 16.4700729),
      new Leaflet.LatLng(43.5074826, 16.4390046),
    ] as Leaflet.LatLng[], {
      color: '#0d9148'
    } as Leaflet.PolylineOptions)
  ] as Leaflet.Polyline[];
};

export const getPolygons = (): Leaflet.Polygon[] => {
  return [
    new Leaflet.Polygon([
      new Leaflet.LatLng(43.5181349, 16.4537963),
      new Leaflet.LatLng(43.517890, 16.439939),
      new Leaflet.LatLng(43.515599, 16.446556),
      new Leaflet.LatLng(43.518025, 16.463492)
    ] as Leaflet.LatLng[],
      {
        fillColor: '#eb530d',
        color: '#eb780d'
      } as Leaflet.PolylineOptions)
  ] as Leaflet.Polygon[];
};