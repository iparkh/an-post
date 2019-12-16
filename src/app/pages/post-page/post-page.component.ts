import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from 'src/app/shared/posts.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  posts$:Observable<Post>

  constructor(
    private route:ActivatedRoute,
    private postsService:PostsService
  ) {}

  ngOnInit() {
    this.posts$=this.route.params
      .pipe(switchMap(
        (params:Params)=>{
          return this.postsService.getById(params['id'])
        }
      ))
  }

}
