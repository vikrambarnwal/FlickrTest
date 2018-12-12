import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../image.service';
import { Rating } from '../rating';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  public imageData: any;
  imgUrl: string;
  submitted = false;
  model = new Rating('',1,'','');
  public ratingList:any=new Array();

  constructor(private activatedRoute:ActivatedRoute,private apiService:ImageService,private router:Router) { }

  ngOnInit() {
    const imageId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getImageData(imageId);
    this.model.id=imageId;
  }

  getImageData(imageId){
    this.apiService.getImageById(imageId).subscribe((response: any) => {
      this.imageData = response.photo;
      this.imgUrl=sessionStorage.getItem('imageUrl');
    });
  }

  onSubmit() {
    // this.ratingList.push(this.model);
    // sessionStorage.setItem('ratingData', JSON.stringify(this.ratingList));
    sessionStorage.setItem('ratingData', JSON.stringify(this.model)); //for single
    localStorage.removeItem('imageUrl');
    this.router.navigate(['image-list']);
  }

}
