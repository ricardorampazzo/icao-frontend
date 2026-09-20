export interface Lesson {
  id: number;
  name: string;
  content: string;
}

export interface Module {
  id: number;
  name: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  name: string;
  modules: Module[];
}