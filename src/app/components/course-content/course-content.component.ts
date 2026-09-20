
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent {
  title: string = '';
  lessons: string[] = [];
  content: string = '';

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadCourse(id || '');
  }

  loadCourse(id: string) {
    const mockData: any = {
      programacao: {
        title: 'Programação',
        lessons: ['Herança', 'Classes', 'Objetos'],
        content: 'pao1.printAlimento();\ncenoura1.cozinhar();\nabacate1.fazerSuco();'
      },
      frontend: {
        title: 'Front-End',
        lessons: ['HTML Básico', 'CSS Grid', 'React Componentes'],
        content: '<h1>Hello World</h1>\n<div class="grid">Item</div>'
      },
      data: {
        title: 'Data Science',
        lessons: ['Introdução a SQL', 'Python Pandas'],
        content: 'SELECT * FROM alunos;\ndf.describe()'
      },
      ia: {
        title: 'Inteligência Artificial',
        lessons: ['Redes Neurais', 'Chatbots'],
        content: 'modelo.treinar();\nresposta = ia.responder("Olá")'
      }
    };
    const data = mockData[id];
    if (data) {
      this.title = data.title;
      this.lessons = data.lessons;
      this.content = data.content;
    }
  }
}
