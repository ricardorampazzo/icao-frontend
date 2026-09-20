export type LessonType = 'IMAGE' | 'AUDIO' | 'VIDEO' | 'TEXT' | null;

export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  type: LessonType;
  mediaUrl: string | null;
  orderIndex: number;
  durationSec: number | null;
  active: boolean | null;
  // para compatibilidade com seu template antigo:
  content?: string | null; // opcional (para TEXT)
}
