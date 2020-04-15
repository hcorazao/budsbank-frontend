import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DispensariesService } from '../../../services/dispensaries/dispensaries.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import googlemaps from 'googlemaps';

@Component({
  selector: 'app-update-dispensary',
  templateUrl: './update-dispensary.component.html',
  styleUrls: ['./update-dispensary.component.scss']
})
export class UpdateDispensaryComponent implements OnInit {

  public showAddress        : any;
  public mapLatitude        : number;
  public mapLongitude       : number;
  public changedAddress     : string;
  public zoom               : number;
  public mapAddress         : string;
  private geoCoder          : any;
  public imageName          : string;
  public fileData           : File = null;
  public previewUrl         : any = null;
  public fileUploadProgress : string = null;
  public uploadedFilePath   : string = null;
  public dispensaryProfile  : any;
  public uploadAPI          = `${environment.apiUrl}/dispensary/add/image`;
  public dispensaryImage  : any;

  imageTitle = 'budsbankadminpanel';
  public uploader: FileUploader = new FileUploader({
    'url'           : this.uploadAPI,
     itemAlias      : 'image',
     allowedFileType: ['image']
  });

  @ViewChild('search', {'static': true}) 
  public searchElementRef: ElementRef;

  updateDispensaryForm = new FormGroup({
    featured      : new FormControl(''),
    name          : new FormControl(''),
    longitude     : new FormControl(''),
    latitude      : new FormControl(''),
    phone         : new FormControl(''),
    address       : new FormControl(''),
    image         : new FormControl(''),
    open_time     : new FormControl(''),
    close_time    : new FormControl(''),
    open_day      : new FormControl(''),
    close_day     : new FormControl(''),
    dispensary_id : new FormControl(''),
    deal : new FormControl(''),
  });

  constructor(
    private router          : Router, 
    private dispensary      : DispensariesService, 
    private formBuilder     : FormBuilder, 
    private mapsAPILoader   : MapsAPILoader, 
    private ngZone          : NgZone, 
    private currentRoute    : ActivatedRoute) { }

  ngOnInit() {

    this.currentRoute.params.subscribe(params => {
      this.dispensary.getDispensaryById(params.id).then(response => { 
        if (response['status'] === 200){
          if (response['data'].length > 0){ 
            this.dispensaryProfile = response['data'][0];
            this.setCurrentLocation(this.dispensaryProfile); 
            this.updateDispensaryForm.controls['dispensary_id'].setValue(response['data'][0].id);
            if(response['data'][0].featured === true || response['data'][0].featured === 'true'){
              this.updateDispensaryForm.controls['featured'].setValue(response['data'][0].featured); 
            }
            if(response['data'][0].image){
              this.dispensaryImage = response['data'][0].image;
            }
            this.updateDispensaryForm.controls['name'].setValue(response['data'][0].name);
            this.updateDispensaryForm.controls['phone'].setValue(response['data'][0].phone);
            this.updateDispensaryForm.controls['address'].setValue(response['data'][0].address);
            this.updateDispensaryForm.controls['deal'].setValue(response['data'][0].deal);
            this.showAddress = response['data'][0].address;
            // this.updateDispensaryForm.controls['image'].setValue(response['data'][0].image); 
            this.updateDispensaryForm.controls['open_time'].setValue(response['data'][0].timmings.open_time);
            this.updateDispensaryForm.controls['close_time'].setValue(response['data'][0].timmings.close_time);
            this.updateDispensaryForm.controls['open_day'].setValue(response['data'][0].timmings.open_day);
            this.updateDispensaryForm.controls['close_day'].setValue(response['data'][0].timmings.close_day);
            this.updateDispensaryForm.controls['longitude'].setValue(response['data'][0].longitude);
            this.updateDispensaryForm.controls['latitude'].setValue(response['data'][0].latitude);
          }
        }else{
          console.log(response);
          swal.fire('Error', `${response['message']}`, 'error');
        }
      });
    });

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.mapLatitude = place.geometry.location.lat();
          this.mapLongitude = place.geometry.location.lng();
          this.changedAddress = place.formatted_address;
          this.zoom = 12;
        });
      });
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any) => {
      console.log(item.file.name);
    };

    this.updateDispensaryForm = this.formBuilder.group({
      featured      : [null],
      name          : ['', [Validators.required]],
      phone         : ['', [Validators.required]],
      address       : ['', [Validators.required]],
      image         : [null],
      open_time     : ['', [Validators.required]],
      close_time    : ['', [Validators.required]],
      open_day      : ['', [Validators.required]],
      close_day     : ['', [Validators.required]],
      dispensary_id : [''],
      latitude      : [''],
      longitude     : [''],
      deal          : ['']
    })

  }
  
  private setCurrentLocation(locationToSet: any) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapLatitude = locationToSet.latitude;
        this.mapLongitude = locationToSet.longitude;
        this.zoom = 8;
        this.getAddress(this.mapLatitude, this.mapLongitude, 0);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.mapLatitude = $event.coords.lat;
    this.mapLongitude = $event.coords.lng;
    this.getAddress(this.mapLatitude, this.mapLongitude, 1);
  }

  getAddress(latitude: any, longitude: any, isDrag: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.mapAddress = results[0].formatted_address;
          if(isDrag === 1 || isDrag === '1'){
              this.showAddress = results[0].formatted_address;
              this.changedAddress = results[0].formatted_address;
          }
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  get dispensary_id(){
    return this.updateDispensaryForm.get('dispensary_id');
  }

  get featured(){
    return this.updateDispensaryForm.get('featured');
  }

  get name(){
    return this.updateDispensaryForm.get('name');
  }

  get phone(){
    return this.updateDispensaryForm.get('phone');
  }

  get address(){
    return this.updateDispensaryForm.get('address');
  }

  get deal(){
    return this.updateDispensaryForm.get('deal');
  }

  get image(){
    return this.updateDispensaryForm.get('image');
  }

  get open_time(){
    return this.updateDispensaryForm.get('open_time');
  }

  get close_time(){
    return this.updateDispensaryForm.get('close_time');
  }

  get open_day(){
    return this.updateDispensaryForm.get('open_day');
  }

  get close_day(){
    return this.updateDispensaryForm.get('close_day');
  }

  get latitude(){
    return this.updateDispensaryForm.get('latitude');
  }

  get longitude(){
    return this.updateDispensaryForm.get('longitude');
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  onUpdateDispensarySubmit(){
    if (!this.updateDispensaryForm.invalid){
      var data = this.updateDispensaryForm.value;
      // data['longitude'] = this.mapLongitude;
      // data['latitude'] = this.mapLatitude;

      data['longitude'] = (!this.mapLongitude) ? this.updateDispensaryForm.value.longitude : this.mapLongitude;
      data['latitude'] = (!this.mapLatitude) ? this.updateDispensaryForm.value.latitude : this.mapLatitude;
      data['formatted_address'] = (!this.changedAddress) ? this.updateDispensaryForm.value.address : this.changedAddress;

      if(!this.changedAddress){
        console.log('yes');
      }else{
        console.log('no');
      }
      console.log(data['formatted_address']);
      console.log(this.updateDispensaryForm.value.address);
      if (!data['featured']){
        data['featured'] = 'false';
      } 
      this.dispensary.updateDispensary(data).then(updateResponse => { 
        if (updateResponse['status'] === 200){
          if (this.fileData){ 
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('dispensaryId' , updateResponse['data'].dispensaryId);
            }
            this.uploader.uploadAll();
            this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
              if(response){ 
                var formatedResponse = JSON.parse(response); 
                if (formatedResponse['status'] !== 200){
                  swal.fire('Error', `${formatedResponse['message']}`, 'error');
                }
              }
            }
          }
          swal.fire('Success', "Dispensary Updated Successfully", 'success').then((result) => {
            let admin = JSON.parse(localStorage.getItem('userInfo'));
            // if(admin.role === 1){
              this.router.navigateByUrl(`/admin/dispensary/${updateResponse['data'].dispensaryId}`);
            // }else{
            //   this.router.navigateByUrl('/admin/dispensary/profile');
            // }
          });
        }else{ 
          console.log(updateResponse)
          swal.fire('Error', `${updateResponse['message']}`, 'error');
        }
      });  
    }
  }

}
