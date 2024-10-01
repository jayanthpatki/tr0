import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Blog {
  id: number; // Include the id to identify the blog
  title: string;
  content: string;
  createdDate: string; // Use string to match the API response format
  comments: any[]; // Include comments (if needed)
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'] // Optional, for styling
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = []; // Initialize as an empty array

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchBlogs(); // Call the method to fetch blogs on initialization
  }

  fetchBlogs() {
    this.http.get<Blog[]>('http://localhost:8080/api/users/1/blogs').subscribe({
      next: (data) => {
        this.blogs = data.map(blog => ({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          createdDate: blog.createdDate,
          comments: blog.comments
        }));
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      }
    });
  }

  createBlog() {
    // Navigate to the Create Blog page
    this.router.navigate(['/create-blog']); // Ensure this matches your routing setup
  }

  viewBlog(blog: Blog) {
    // Navigate to the Blog Details Page, passing necessary parameters
    this.router.navigate(['/blog-details', { 
      title: blog.title, 
      content: blog.content,
      // Removed user reference since it's not in the API response
      author: 'Unknown', // Set a default value or remove if not needed
      date: blog.createdDate 
    }]);
  }
}
