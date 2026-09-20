import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Module, Lesson } from '../../models/course.model';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html'
})
export class ModuleDetailComponent {
  module?: Module;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    const allModules = this.courseService.getCourses().flatMap(course => course.modules);
    this.module = allModules.find(m => m.id === moduleId);
  }

  selectLesson(lesson: Lesson) {
    this.router.navigate(['/module', this.module?.id, 'lesson', lesson.id]);
  }
}