export type MediaKind = 'IMAGE' | 'AUDIO' | 'VIDEO';

export interface MediaAsset {
  id: number;
  lessonId: number;
  kind: MediaKind;
  url: string;
  thumbnailUrl?: string;
  mimeType?: string;
  lengthSeconds?: number;
  width?: number;
  height?: number;
}
