import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Lesson } from '../../models/course.model';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html'
})
export class LessonContentComponent {
  lesson?: Lesson;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    const lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));
    const allLessons = this.courseService.getCourses()
      .flatMap(course => course.modules)
      .flatMap(module => module.lessons);

    this.lesson = allLessons.find(l => l.id === lessonId);
  }
}