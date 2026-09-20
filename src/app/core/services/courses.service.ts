import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { MOCK_COURSES } from '../mocks/simulations.mock';

export interface CourseVm {
  id: number;
  code: string;
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  list(): Observable<CourseVm[]> {
    return this.http
      .get<CourseVm[]>(`${this.baseUrl}/api/simulations`)
      .pipe(
        map((courses) => (courses?.length ? courses : MOCK_COURSES)),
        catchError(() => of(MOCK_COURSES))
      );
  }

  get(code: string): Observable<CourseVm> {
    return this.http
      .get<CourseVm>(`${this.baseUrl}/api/simulations/${code}`)
      .pipe(catchError(() => of(MOCK_COURSES.find((course) => course.code === code) ?? MOCK_COURSES[0])));
  }
}
