import {AfterViewInit, Component} from '@angular/core';
import  * as L from 'leaflet';
import {Observable, Subscriber} from "rxjs";
 
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',  
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit  {
  map: any;

  constructor() {
  }

  public ngAfterViewInit(): void {
    this.loadMap();

    
  // Récupérer le bouton de recherche dans le DOM
  const searchButton = document.getElementById('searchParkingButton');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const parkingQuery = prompt('Entrez le nom du parking que vous recherchez:');
      if (parkingQuery) {
        this.searchParking(parkingQuery).subscribe(
          (results) => this.handleSearchResults(results),
          (error) => console.error('Erreur lors de la recherche de parking:', error)
        );
      }
    });
  } else {
    console.error("Le bouton de recherche de parking n'a pas été trouvé dans le DOM.");
  }
  }

   

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:'sk.eyJ1Ijoic2JhaS1oYW16YSIsImEiOiJjbGttb210YTQwdXkzM2NsOWdneGh4eWg4In0.i9yo5Cp33VndJKIo1c9Uhw',
    }).addTo(this.map);

    this.getCurrentPosition()
    .subscribe((position: any) => {
      this.map.flyTo([position.latitude, position.longitude], 13);

      const icon = L.icon({
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png',
        popupAnchor: [13, 0],
      });

      const marker = L.marker([position.latitude, position.longitude], { icon }).bindPopup('Angular Leaflet');
      marker.addTo(this.map);
    });
  }

  private searchParking(query: string): Observable<any> {
    const accessToken = 'sk.eyJ1Ijoic2JhaS1oYW16YSIsImEiOiJjbGttb210YTQwdXkzM2NsOWdneGh4eWg4In0.i9yo5Cp33VndJKIo1c9Uhw';
    const countryFilter = 'Tunisia'; // Filtrer par pays (Tunisie)
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?country=${encodeURIComponent(countryFilter)}&access_token=${accessToken}`;
      return new Observable((observer: Subscriber<any>) => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  private handleSearchResults(results: any): void {
    // Récupérer les résultats de la recherche
    const features = results.features;
  
    if (!features || features.length === 0) {
      // Aucun résultat trouvé
      console.log("Aucun lieu trouvé.");
      return;
    }
  
    // Filtrer les résultats pour n'afficher que les parkings en Tunisie
    const tunisianParkings = features.filter((feature: any) => {
      // Vous pouvez personnaliser les critères de filtrage ici, par exemple en vérifiant le nom ou d'autres propriétés du lieu
      const placeType = feature?.properties?.category;
      const placeCountry = feature?.context?.find((context: any) => context.id.includes('country'));
  
      return placeType === 'parking' && placeCountry?.text === 'Tunisia';
    });
  
    if (tunisianParkings.length === 0) {
      console.log("Aucun parking en Tunisie trouvé.");
      return;
    }
  
    // Afficher les marqueurs des parkings en Tunisie sur la carte
    tunisianParkings.forEach((parking: any) => {
      const { center, place_name } = parking;
      const [longitude, latitude] = center;
  
      const parkingMarker = L.marker([latitude, longitude])
        .addTo(this.map)
        .bindPopup(place_name)
        .openPopup();
    });
  
    // Centrer la carte sur le premier parking trouvé en Tunisie
    const { center } = tunisianParkings[0];
    const [longitude, latitude] = center;
    this.map.flyTo([latitude, longitude], 15);
  }
}