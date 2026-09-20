import { Injectable } from '@angular/core';
import { COURSES } from '../mocks/courses.mock';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  getCourses(): Course[] {
    return COURSES;
  }
}