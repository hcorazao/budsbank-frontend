import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DispensariesService } from '../../../services/dispensaries/dispensaries.service';
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import googlemaps from 'googlemaps';

@Component({
  selector: 'app-add-dispensary',
  templateUrl: './add-dispensary.component.html',
  styleUrls: ['./add-dispensary.component.scss']
})
export class AddDispensaryComponent implements OnInit {

  public showAddress        : any;
  public mapLatitude        : number;
  public mapLongitude       : number;
  public zoom               : number;
  public changedAddress     : string;
  public mapAddress         : string;
  private geoCoder          : any;
  public imageName          : string;
  public fileData           : File = null;
  public previewUrl         : any = null;
  public fileUploadProgress : string = null;
  public uploadedFilePath   : string = null;
  public uploadAPI          = `${environment.apiUrl}/dispensary/add/image`;

  public user: string;

  imageTitle = 'budsbankadminpanel';
  public uploader: FileUploader = new FileUploader({
    'url'           : this.uploadAPI,
     itemAlias      : 'image',
     allowedFileType: ['image']
  });


  @ViewChild('search', {'static': true}) 
  public searchElementRef: ElementRef;

  addDispensaryForm = new FormGroup({
    featured      : new FormControl(''),
    name          : new FormControl(''),
    longitude     : new FormControl(''),
    latitude      : new FormControl(''),
    phone         : new FormControl(''),
    address       : new FormControl(''),
    image         : new FormControl(''),
    opening_time  : new FormControl(''),
    closing_time  : new FormControl(''),
    open_day      : new FormControl(''),
    close_day     : new FormControl(''),
    deal          : new FormControl(''),
  });

  constructor(
    private router: Router, 
    private dispensary: DispensariesService, 
    private formBuilder: FormBuilder, 
    private mapsAPILoader: MapsAPILoader, 
    private ngZone: NgZone) { }
  
  ngOnInit() {

    let admin = JSON.parse(localStorage.getItem('userInfo')); console.log(admin);
    this.user = admin['name'];

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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


    this.addDispensaryForm = this.formBuilder.group({
      featured    : [false, [Validators.required]],
      name        : ['', [Validators.required]],
      phone       : ['', [Validators.required]],
      address     : [false, [Validators.required]],
      image       : [null, [Validators.required]],
      opening_time: ['', [Validators.required]],
      closing_time: ['', [Validators.required]],
      open_day    : ['', [Validators.required]],
      close_day   : ['', [Validators.required]],
      deal        : []
    })
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapLatitude = position.coords.latitude;
        this.mapLongitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.mapLatitude, this.mapLongitude, 0);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    
    this.mapLatitude = $event.coords.lat;
    this.mapLongitude = $event.coords.lng;
    this.getAddress(this.mapLatitude, this.mapLongitude, 1);
  }
 
  getAddress(latitude: any, longitude: any, isDrag: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      
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

  get name(){
    return this.addDispensaryForm.get('name');
  }

  get longitude(){
    return this.addDispensaryForm.get('longitude');
  }

  get latitude(){
    return this.addDispensaryForm.get('latitude');
  }

  get phone(){
    return this.addDispensaryForm.get('phone');
  }

  get address(){
    return this.addDispensaryForm.get('address');
  }

  get image(){
    return this.addDispensaryForm.get('image');
  }

  get opening_time(){
    return this.addDispensaryForm.get('opening_time');
  }

  get closing_time(){
    return this.addDispensaryForm.get('closing_time');
  }

  get open_day(){
    return this.addDispensaryForm.get('open_day');
  }

  get close_day(){
    return this.addDispensaryForm.get('close_day');
  }

  get deal(){
    return this.addDispensaryForm.get('deal');
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  onAddDispensarySubmit(){
    if (!this.addDispensaryForm.invalid){
      var data = this.addDispensaryForm.value;
      data['longitude'] = this.mapLongitude;
      data['latitude'] = this.mapLatitude;
      data['formatted_address'] = this.changedAddress;
      if (!data['featured']){
        data['featured'] = 'false';
      }
      let admin = JSON.parse(localStorage.getItem('userInfo'));
      data['user_id'] = admin.id;
      this.dispensary.addDispensary(data).then(addResponse => { 
        if (addResponse['status'] === 200){
          if (this.fileData){ 
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('dispensaryId' , addResponse['data'].dispensaryId);
            }
            this.uploader.uploadAll();
            this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
              if(response){ 
                var formatedResponse = JSON.parse(response); 
                if (formatedResponse['status'] === 200){
                  swal.fire('Success', "Dispensary Added Successfully", 'success').then((result) => {
                    let admin = JSON.parse(localStorage.getItem('userInfo'));
                    if(admin.role === 1){
                      this.router.navigateByUrl(`/admin/dispensary/${addResponse['data'].dispensaryId}`);
                    }else{
                      this.router.navigateByUrl('/admin/dispensary/profile');
                    }
                  });
                }
              }
            }
          }
        }else{ 
          console.log(addResponse)
          swal.fire('Error', `${addResponse['message']}`, 'error');
        }
      });  
    }
  }
}
