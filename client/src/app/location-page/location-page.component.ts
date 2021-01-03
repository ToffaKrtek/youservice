import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener } from '@angular/core'
import { marker } from '../shared/services/marker.image'
import { proj, View } from 'openlayers'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { GeoLocationService } from '../shared/services/geo-location.service'
import { FormGroup, FormControl } from '@angular/forms'
import { MaterialService } from '../shared/classes/material.service'
import { Order } from '../shared/interfaces'

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css'],
  providers: [HttpClient, GeoLocationService]
})
export class LocationPageComponent implements OnInit, OnDestroy{
  @Input()
  geoReverseService = 'https://nominatim.openstreetmap.org/reverse?key=iTzWSiYpGxDvhATNtSrqx5gDcnMOkntL&format=json&addressdetails=1&lat={lat}&lon={lon}'

  form: FormGroup | undefined;

  //Поля ввода адреса, выбор поля для заполнения (0 || 1)
  start_point = {
    lat: '',
    lon: '',
    address: ''
  }
  end_point = {
    lat: '',
    lon: '',
    address: {}
  }
  points_input = [this.start_point, this.end_point]
  active_input = 0

  width: string = '1000px'
  height: string = '1000px'

  @Input()
  latitude = 55.34339209297177
  @Input()
  longitude = 86.08196862695301
 // Координаты центра Кемерова [55.34339209297177,86.08196862695301]
  @Input()
  latitudePointer = 55.34339209297177
  @Input()
  longitudePointer = 86.08196862695301
  @Input()
  showControlsZoom: boolean
  @Input()
  titleZoomIn = 'Zoom in'
  @Input()
  titleZoomOut = 'Zoom out'
  @Input()
  showControlsCurrentLocation: boolean
  @Input()
  titleCurrentLocation = 'Current location'

  @Input()
  showDebugInfo: boolean
  @Input()
  opacity = 1
  @Input()
  zoom = 14

  markerImage = marker

  reverseGeoSub: Subscription = null
  pointedAddress: string
  pointedAddressOrg: string
  position: any
  dirtyPosition



  @Output()
  addressChanged = new EventEmitter<String>()

  constructor(private httpClient: HttpClient, private geoLocationService: GeoLocationService) {
    this.getScreenSize();
  }

  ngOnInit() {
    
      this.geoLocationService.getLocation().subscribe((position) => {
        this.position = position
        if (!this.dirtyPosition) {
          this.dirtyPosition = true
          this.longitude = this.longitudePointer = this.position.coords.longitude
          this.latitude = this.latitudePointer = this.position.coords.latitude
        }
      })
  
      this.form = new FormGroup( {
        start_point: new FormControl(null),
        end_point: new FormControl(null),
      })
  }

  ngOnDestroy() {
    if (this.reverseGeoSub) {
      this.reverseGeoSub.unsubscribe()
    }
  }
  onSingleClick(event: { coordinate: ol.Coordinate }) {
    const lonlat = proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326')
    this.longitudePointer = lonlat[0]
    this.latitudePointer = lonlat[1]
    this.reverseGeo()
    
  }
  increaseOpacity() {
    this.opacity += 0.1
  }

  decreaseOpacity() {
    this.opacity -= 0.1
  }
  increaseZoom() {
    this.zoom++
  }
  decreaseZoom() {
    this.zoom--
  }

  setCurrentLocation(event) {
    // TODO FIX: setting current location does move the pointer but not the map!!!
    if (this.position) {
      this.longitude = this.longitudePointer = this.position.coords.longitude
      this.latitude = this.latitudePointer = this.position.coords.latitude
      /**
       * Trigger new address change
       */
      this.reverseGeo()
    }
  }

  reverseGeo() {
    const service = (this.geoReverseService || '')
      .replace(new RegExp('{lon}', 'ig'), `${this.longitudePointer}`)
      .replace(new RegExp('{lat}', 'ig'), `${this.latitudePointer}`)
    this.reverseGeoSub = this.httpClient.get(service).subscribe(data => {
      const val = (data || {})
      
      //Сохраняем и выводим данные при клике в поле активной формы
      this.points_input[this.active_input].lat = data.lat
      this.points_input[this.active_input].lon = data.lon
      this.points_input[this.active_input].address = data.address.road + " " + data.address.house_number;
      if(this.active_input == 0){
        this.form.patchValue({
        start_point: this.points_input[0].address
      })
      }else if(this.active_input == 1){
        this.form.patchValue({
        
          end_point: this.points_input[1].address,
         }) 
      }
      MaterialService.updateTextInputs()
      console.log(this.points_input[this.active_input])

      //Меняем активную форму
      this.active_input = this.active_input == 0 ? 1 : 0;

      this.pointedAddressOrg = val['display_name']
      const address = []

      const building = []
      if (val['address']['building']) {
        building.push(val['address']['building'])
      }
      if (val['address']['mall']) {
        building.push(val['address']['mall'])
      }
      if (val['address']['theatre']) {
        building.push(val['address']['theatre'])
      }

      const zip_city = []
      if (val['address']['postcode']) {
        zip_city.push(val['address']['postcode'])
      }
      if (val['address']['city']) {
        zip_city.push(val['address']['city'])
      }
      const street_number = []
      if (val['address']['street']) {
        street_number.push(val['address']['street'])
      }
      if (val['address']['road']) {
        street_number.push(val['address']['road'])
      }
      if (val['address']['footway']) {
        street_number.push(val['address']['footway'])
      }
      if (val['address']['pedestrian']) {
        street_number.push(val['address']['pedestrian'])
      }
      if (val['address']['house_number']) {
        street_number.push(val['address']['house_number'])
      }

      if (building.length) {
        address.push(building.join(' '))
      }
      if (zip_city.length) {
        address.push(zip_city.join(' '))
      }
      if (street_number.length) {
        address.push(street_number.join(' '))
      }

      this.pointedAddress = address.join(', ')

      this.addressChanged.emit(this.pointedAddress)
    })
    
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.height = window.innerHeight + 'px';
        this.width = window.innerWidth  + 'px';
  }

  onSubmit() {
  //   const order: Order = {
  //   user_id: this.user.id, 
  //   way_start: {
  //       type: {
  //           enum: ['Point'],
  //           },
  //         coordinates: [
  //           0: this.start_point.lat,
  //           1: this.start_point.lon 
  //         ]},
  //   way_end: {
  //       type: {
  //           type: string,
  //           enum: ['Point'],
  //         },
  //         coordinates: {
  //             type: [number]
  //         }  
  //       }, 
  //   time_created: Date,
  //   comments?: this.comments,
  //   active: true, 
  //   price: this.price,
  //   }
  }
}
