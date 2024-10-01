import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Comment {
  author: string;
  text: string;
  date: Date;
}

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  title: string | null = null;
  content: string | null = null;
  author: string | null = null; // Added author
  date: string | null = null; // Added date
  comments: Comment[] = []; // Array to store comments
  newCommentText: string = ''; // Comment text input
  newCommentAuthor: string = ''; // Author name input

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the blog details from the route parameters
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.content = this.route.snapshot.paramMap.get('content') || '';
    this.author = this.route.snapshot.paramMap.get('author') || ''; // Get author
    this.date = this.route.snapshot.paramMap.get('date') || ''; // Get date
  }

  addComment() {
    if (this.newCommentText && this.newCommentAuthor) {
      const newComment: Comment = {
        author: this.newCommentAuthor,
        text: this.newCommentText,
        date: new Date(),
      };
      this.comments.push(newComment); // Add the new comment to the comments array
      this.newCommentText = ''; // Reset the comment input
      this.newCommentAuthor = ''; // Reset the author input
    }
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1); // Remove the comment at the specified index
  }
}
