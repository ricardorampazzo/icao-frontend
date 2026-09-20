import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course, Module } from '../../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html'
})
export class CourseListComponent {
  courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) {
    this.courses = this.courseService.getCourses();
  }

  selectModule(module: Module) {
    this.router.navigate(['/module', module.id]);
  }
}