import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { Rating } from '../rating';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  public images=new Array;
  public ratedList:any=new Array();
  public ratedData:Rating;
  public pageNumber:number=1;

  constructor(private apiService:ImageService,private router:Router) { }

  ngOnInit() {
    this.getImageList();
  }

  public getImageList(){
    this.apiService.getImages(this.pageNumber).subscribe((responseData: any) => {
      this.images = responseData.photos.photo;
      this.ratedData=JSON.parse(sessionStorage.getItem('ratingData'));
    });
  }

  public getImages(page){
    if(page == -1){
      this.pageNumber=this.pageNumber-1;
    }else{
      this.pageNumber=this.pageNumber+1;
    }
    this.apiService.getImages(this.pageNumber).subscribe((responseData: any) => {
      console.log(this.images.length);
      
      this.images=responseData.photos.photo;
      this.ratedData=JSON.parse(sessionStorage.getItem('ratingData'));
    });
  }

  /**
   * getDetails of Image
   */
  public getDetails(imageData) {
    sessionStorage.setItem('imageUrl',imageData.url_m);
    this.router.navigate([ 'image-details'+ '/' + imageData.id]);
  }

}
