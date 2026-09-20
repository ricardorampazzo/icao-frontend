import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService, CourseVm } from '../../core/services/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  loading = true;
  courses: CourseVm[] = [];

  constructor(
    private api: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.list().subscribe({
      next: (items) => {
        this.courses = items ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  open(course: CourseVm): void {
    this.router.navigate(['/courses', course.id, 'modules']);
  }
}
