import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonsService, LessonVm, LessonType, LessonAssetVm } from '../../core/services/lessons.service';

@Component({
  selector: 'app-lessons-page',
  templateUrl: './lessons-page.component.html',
  styleUrls: ['./lessons-page.component.scss']
})
export class LessonsPageComponent implements OnInit {
  lessons: LessonVm[] = [];
  selectedLesson?: LessonVm;
  moduleId!: number;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private api: LessonsService
  ) {}

  ngOnInit(): void {
    this.moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    this.api.byModule(this.moduleId).subscribe({
      next: (list) => {
        this.lessons = [...list].sort((a, b) => {
          const ai = a.orderIndex ?? Number.MAX_SAFE_INTEGER;
          const bi = b.orderIndex ?? Number.MAX_SAFE_INTEGER;
          return ai - bi;
        });
        this.selectedLesson = this.lessons[0];
        this.loading = false;
      },
      error: _ => { this.loading = false; }
    });
  }

  select(l: LessonVm) {
    this.selectedLesson = l;
  }

  // Getters só pra facilitar o template (sem array)
  get type1(): LessonType { return this.selectedLesson?.type1 ?? null; }
  get type2(): LessonType { return this.selectedLesson?.type2 ?? null; }
  get type3(): LessonType { return this.selectedLesson?.type3 ?? null; }

  get mediaUrl1(): string | null { return this.selectedLesson?.mediaUrl1 ?? null; }
  get mediaUrl2(): string | null { return this.selectedLesson?.mediaUrl2 ?? null; }
  get mediaUrl3(): string | null { return this.selectedLesson?.mediaUrl3 ?? null; }

  get assetsToRender(): LessonAssetVm[] {
    if (!this.selectedLesson) return [];

    const assets = this.selectedLesson.assets ?? [];
    if (assets.length > 0) {
      return [...assets].sort((a, b) => {
        const ai = a.orderIndex ?? Number.MAX_SAFE_INTEGER;
        const bi = b.orderIndex ?? Number.MAX_SAFE_INTEGER;
        return ai - bi;
      });
    }

    return [
      this.legacyAsset(this.selectedLesson.type1, this.selectedLesson.mediaUrl1, 1),
      this.legacyAsset(this.selectedLesson.type2, this.selectedLesson.mediaUrl2, 2),
      this.legacyAsset(this.selectedLesson.type3, this.selectedLesson.mediaUrl3, 3),
    ].filter((asset): asset is LessonAssetVm => asset !== null);
  }

  private legacyAsset(type: LessonType, url: string | null, orderIndex: number): LessonAssetVm | null {
    if (!type || !url || !this.selectedLesson) return null;

    return {
      id: orderIndex,
      lessonId: this.selectedLesson.id,
      type,
      role: orderIndex === 1 ? 'MAIN' : 'SUPPORT',
      url,
      orderIndex,
    };
  }

  formatDuration(sec: number | null | undefined): string {
    if (sec == null) return '—';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  }
}
