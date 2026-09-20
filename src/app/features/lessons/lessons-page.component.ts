import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LessonsService,
  LessonVm,
  LessonType,
  LessonAssetVm,
  QuestionStepVm,
} from '../../core/services/lessons.service';

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
  visibleStepCount = 2;
  private audioStarts: Record<string, number> = {};

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
        this.select(this.lessons[0]);
        this.loading = false;
      },
      error: _ => { this.loading = false; }
    });
  }

  select(l: LessonVm) {
    this.selectedLesson = l;
    this.visibleStepCount = Math.min(2, this.stepsToRender.length);
  }

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

  get stepsToRender(): QuestionStepVm[] {
    if (!this.selectedLesson) return [];

    const steps = this.selectedLesson.steps ?? [];
    if (steps.length > 0) {
      return [...steps].sort((a, b) => a.orderIndex - b.orderIndex);
    }

    const fallback: QuestionStepVm[] = [];
    if (this.selectedLesson.content) {
      fallback.push({
        id: `${this.selectedLesson.id}-content`,
        lessonId: this.selectedLesson.id,
        type: 'TEXT',
        role: 'CONTEXT',
        content: this.selectedLesson.content,
        orderIndex: 0,
      });
    }

    this.assetsToRender.forEach((asset, index) => {
      if (!asset.type || asset.type === 'TEXT') return;
      fallback.push({
        id: asset.id,
        lessonId: this.selectedLesson!.id,
        type: asset.type,
        role: asset.role,
        url: asset.url,
        orderIndex: asset.orderIndex ?? index + 1,
      });
    });
    return fallback;
  }

  get visibleSteps(): QuestionStepVm[] {
    return this.stepsToRender.slice(0, this.visibleStepCount);
  }

  get hasNextStep(): boolean {
    return this.visibleStepCount < this.stepsToRender.length;
  }

  revealNextStep(): void {
    if (this.hasNextStep) this.visibleStepCount += 1;
  }

  restartQuestion(): void {
    if (!this.selectedLesson) return;
    for (const step of this.stepsToRender) delete this.audioStarts[String(step.id)];
    this.visibleStepCount = Math.min(2, this.stepsToRender.length);
  }

  resolveUrl(step: QuestionStepVm): string | null {
    return this.api.resolveMediaUrl(step.url);
  }

  roleLabel(role: string): string {
    const labels: Record<string, string> = {
      CONTEXT: 'Contexto',
      INITIAL_AUDIO: 'Chamada do controlador',
      READBACK: 'Sua resposta',
      INCIDENT: 'Nova situacao',
      INCIDENT_IMAGE: 'Referencia visual',
      INCIDENT_RESPONSE: 'Sua comunicacao',
      FOLLOW_UP_AUDIO: 'Resposta do controlador',
      CONFIRM_OR_CLARIFY: 'Confirmacao final',
      DIALOGUE_AUDIO: 'Dialogo',
      COMPREHENSION_RESPONSE: 'Sua analise',
    };
    return labels[role] ?? 'Etapa';
  }

  onAudioPlay(step: QuestionStepVm, player: HTMLAudioElement): void {
    if (player.currentTime > 0.25) return;

    const key = String(step.id);
    const starts = this.audioStarts[key] ?? 0;
    const limit = step.maxPlays ?? Number.MAX_SAFE_INTEGER;
    if (starts >= limit) {
      player.pause();
      player.currentTime = 0;
      return;
    }
    this.audioStarts[key] = starts + 1;
  }

  audioUsage(step: QuestionStepVm): string {
    if (!step.maxPlays) return '';
    return `${this.audioStarts[String(step.id)] ?? 0}/${step.maxPlays} reproducoes`;
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

}
