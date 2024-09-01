import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service'; 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: any = {
    nameb: '',   // Updated to match the backend field
    aname: '',   // Updated to match the backend field
    blog: ''     // Updated to match the backend field
  };

  @Output() postCreated = new EventEmitter<void>();

  constructor(
    private postService: PostService,
    private dialogRef: MatDialogRef<CreatePostComponent>
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.postService.createPost(this.post.nameb, this.post.aname, this.post.blog).subscribe(
      response => {
        if (response) {
          console.log('Post created:', response);
          this.postCreated.emit();  // Notify parent component
          this.dialogRef.close();
        } else {
          console.error('Failed to create post');
        }
      },
      (error: any) => {
        console.error('Error creating post:', error);
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }
}