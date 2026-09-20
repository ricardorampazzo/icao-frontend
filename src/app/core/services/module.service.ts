import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { MOCK_LESSONS, MOCK_MODULES } from '../mocks/simulations.mock';

export interface ModuleVm {
  id: number;
  courseCode?: string;
  code?: string;
  title: string;
  description?: string;
  orderIndex?: number;
  active?: boolean;
  courseId?: number;
}

export type LessonType = 'IMAGE' | 'AUDIO' | 'VIDEO' | 'TEXT' | null;

export interface LessonVm {
  id: number;
  moduleId: number;
  title: string;
  type: LessonType;
  mediaUrl: string | null;
  orderIndex: number;
  durationSec: number | null;
  active: boolean | null;
  content?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listModules(simulationId: number): Observable<ModuleVm[]> {
    const mockModules = MOCK_MODULES.filter((module) => module.courseId === simulationId);

    return this.http
      .get<ModuleVm[]>(`${this.baseUrl}/api/simulations/${simulationId}/parts`)
      .pipe(
        map((modules) => (modules?.length ? modules : mockModules)),
        catchError(() => of(mockModules))
      );
  }

  lessonsByModule(moduleId: number): Observable<LessonVm[]> {
    const mockLessons = this.toModuleLessons(moduleId);

    return this.http
      .get<LessonVm[]>(`${this.baseUrl}/api/simulations/parts/${moduleId}/questions`)
      .pipe(
        map((lessons) => (lessons?.length ? lessons : mockLessons)),
        catchError(() => of(mockLessons))
      );
  }

  private toModuleLessons(moduleId: number): LessonVm[] {
    return MOCK_LESSONS.filter((lesson) => lesson.moduleId === moduleId).map((lesson) => ({
      id: lesson.id,
      moduleId: lesson.moduleId,
      title: lesson.title,
      type: lesson.type1,
      mediaUrl: lesson.mediaUrl1,
      orderIndex: lesson.orderIndex,
      durationSec: lesson.durationSec,
      active: lesson.active,
      content: lesson.content,
    }));
  }
}
