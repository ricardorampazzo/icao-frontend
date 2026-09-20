import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { MOCK_LESSONS } from '../mocks/simulations.mock';

export type LessonType = 'IMAGE' | 'AUDIO' | 'VIDEO' | 'TEXT' | null;

export type LessonAssetRole = 'MAIN' | 'SUPPORT' | 'THUMBNAIL' | 'ATTACHMENT' | 'SUBTITLE' | string;

export interface LessonAssetVm {
  id: number;
  lessonId: number;
  type: LessonType;
  role: LessonAssetRole;
  provider?: string | null;
  url: string;
  thumbnailUrl?: string | null;
  mimeType?: string | null;
  fileName?: string | null;
  sizeBytes?: number | null;
  durationSeconds?: number | null;
  orderIndex?: number | null;
}

export interface LessonVm {
  id: number;
  moduleId: number;
  title: string;
  type1: LessonType;
  type2: LessonType;
  type3: LessonType;
  mediaUrl1: string | null;
  mediaUrl2: string | null;
  mediaUrl3: string | null;
  orderIndex: number;
  durationSec: number | null;
  active: boolean | null;
  content?: string | null;
  description?: string;
  durationSeconds?: number;
  assets?: LessonAssetVm[];
}

@Injectable({ providedIn: 'root' })
export class LessonsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  byModule(moduleId: number): Observable<LessonVm[]> {
    const mockLessons = MOCK_LESSONS.filter((lesson) => lesson.moduleId === moduleId);

    return this.http
      .get<LessonVm[]>(`${this.baseUrl}/api/simulations/parts/${moduleId}/questions`)
      .pipe(
        map((lessons) => (lessons?.length ? lessons : mockLessons)),
        catchError(() => of(mockLessons))
      );
  }

  get(id: number): Observable<LessonVm> {
    return this.http
      .get<LessonVm>(`${this.baseUrl}/api/simulations/questions/${id}`)
      .pipe(catchError(() => of(MOCK_LESSONS.find((lesson) => lesson.id === id) ?? MOCK_LESSONS[0])));
  }
}
