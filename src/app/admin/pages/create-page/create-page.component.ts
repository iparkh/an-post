import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../../shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { Subscription } from 'rxjs';

import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;
  uSub:Subscription

  constructor(
    private postsService:PostsService,
    private alert: AlertService
    ){}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })
  }
  ngOnDestroy(){
    if (this.uSub){
      this.uSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }

    this.uSub=this.postsService.create(post).subscribe(
      ()=>{
        this.form.reset()
        this.alert.success('Пост був створений')
      }
    )

  }

}