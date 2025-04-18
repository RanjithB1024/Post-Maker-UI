import { Component, OnInit } from '@angular/core';
import { HOME_PAGE } from '../constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { openDialog } from '../utils/utils';
import { SocialPostService } from '../services/social-post.service';

@Component({
  selector: 'app-home-post-page',
  templateUrl: './home-post-page.component.html',
  styleUrls: ['./home-post-page.component.css']
})
export class HomePostPageComponent implements OnInit {
  HOME_PAGE = HOME_PAGE ;
  panelOpenState = new Set<number>();
  counts: number[] = [];
  postData : any ;
  commentsData: any ;
  isExpandedText = true;
  isCommentVisible = new Set<number>();

  constructor(public dialog: MatDialog,  private socialPostService: SocialPostService) {
  }

  ngOnInit() {
    this.fetchingPostDetails();    
  }

  openDialog() {
    openDialog(this.dialog, PostFormComponent)
  }


  togglePanel(index: number) {
    if (this.panelOpenState.has(index)) {
      this.panelOpenState.delete(index);
    } else {
      this.panelOpenState.add(index);
    }
  }

  fetchingPostDetails(){
    this.socialPostService.fetchingPostDetails().subscribe(
      (response) => {  
        this.postData = response;
      }
    );
  }

  fetchingCommentDetails(){
    this.socialPostService.fetchingComments().subscribe(
      (response) => {  
        this.postData = response;
      }
    );
  }

  isPanelOpen(index: number): boolean {
    return this.panelOpenState.has(index);
  }

  toggleDescription(event: Event): void {
    event.preventDefault();
    this.isExpandedText = !this.isExpandedText;
  }

  incrementCount(index: number) {
    this.counts[index]++;
  }

  isCountGreaterThanOne(index: number): boolean {
    return this.counts[index] > 1;
  }

  toggleCommentInput(index: number) {
    if (this.isCommentVisible.has(index)) {
      this.isCommentVisible.delete(index);
    } else {
      this.isCommentVisible.add(index);
    }
  }
  
}
