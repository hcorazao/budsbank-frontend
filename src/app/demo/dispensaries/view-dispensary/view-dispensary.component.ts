import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { DispensariesService } from '../../../services/dispensaries/dispensaries.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { MapsAPILoader } from '@agm/core';
import googlemaps from 'googlemaps';

@Component({
  selector: 'app-view-dispensary',
  templateUrl: './view-dispensary.component.html',
  styleUrls: ['./view-dispensary.component.scss']
})
export class ViewDispensaryComponent implements OnInit {

  public dispensaryProfile  : any;
  public mapLatitude        : number;
  public mapLongitude       : number;
  public zoom               : number;
  public mapAddress         : string;
  private geoCoder          : any;

  constructor(
    private router: Router, 
    private dispensary: DispensariesService, 
    private currentRoute: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader, 
    private ngZone: NgZone) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(params => { 
      if (params.id !== 'profile'){
        this.dispensary.getDispensaryById(params.id).then(response => { 
          if (response['status'] === 200){
            if (response['data'].length > 0){
              this.dispensaryProfile = response['data'][0];
              this.dispensaryProfile['created'] = this.formatDate(this.dispensaryProfile.created);
              this.setCurrentLocation(this.dispensaryProfile);
            }
          }else{
            console.log(response);
            swal.fire('Error', 'Internal Server Error', 'error');
          }
        });
      }else{ 
        this.dispensary.getAdminDispensary().then( response => {
          if (response['status'] === 200){
            if (response['data'].length > 0){
              this.dispensaryProfile = response['data'][0];
              this.dispensaryProfile['created'] = this.formatDate(this.dispensaryProfile.created);
              this.setCurrentLocation(this.dispensaryProfile);
            }
          }else{
            console.log(response);
            // swal.fire('Error', 'No Dispensary Added Yet', 'error');
          }
        })
      }
    });

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    })
  }

  formatDate(date: any) {
    var newDate = new Date(date);
    let month = "" + (newDate.getMonth() + 1);
    let day =   "" + newDate.getDate();
    let year = newDate.getFullYear(); 
    
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("-");
  }

  private setCurrentLocation(locationToSet: any) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapLatitude = locationToSet.latitude;
        this.mapLongitude = locationToSet.longitude;
        this.zoom = 8;
        this.getAddress(this.mapLatitude, this.mapLongitude);
      });
    }
  }
 
  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.mapAddress = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  updateDispensary(userId: any) {
    this.router.navigateByUrl(`admin/dispensary/update/${userId}`);
  }

}
