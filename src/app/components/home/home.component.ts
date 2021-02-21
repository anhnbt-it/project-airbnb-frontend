import {Component, OnInit} from '@angular/core';
import {ListHomeService} from '../../services/list-home.service';
import {FormControl} from '@angular/forms';
import {ListCityService} from '../../services/list-city.service';

interface Country {
  id: number;
  name: string;
  city: any;

}

interface City {
  id: number;
  name: string;
}

@Component({
  selector: 'app-list-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  places: any;
  rooms = [];
  myControl = new FormControl();
  back: any;
  roomImg = [];
  add = '';

  constructor(private serviceHome: ListHomeService, private serviceCity: ListCityService) {
  }

  ngOnInit(): void {
    this.serviceHome.getAll().subscribe((res: any) => {
      this.rooms = res.data;

      console.log(this.rooms[0].roomImages[0].imageUrl);
    });

    this.serviceCity.getAllCity().subscribe((res: any) => {
      this.places = res.data;
      console.log(this.places);
    });
  }

  search(id: number): void {
    this.serviceHome.findAllByCityId(id).subscribe((res: any) => {
      this.rooms = res.data;
      console.log(id + ' search');
    });
    this.back = 'Xem Tất Cả Phòng';
  }

  search2(): void {
    this.serviceHome.findAllByAddress(this.add).subscribe((res: any) => {
      this.rooms = res.data;
    });
    this.back = 'Xem Tất Cả Phòng';
  }

  getAllHome(): void {
    this.serviceHome.getAll().subscribe((res: any) => {
      this.rooms = res.data;

      this.back = '';
    });

  }


}
