import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  features = [
    {
      icon: 'AU',
      title: 'Áudios de alta qualidade',
      description:
        'Treinos com dubladores nativos e diferentes sotaques para aproximar o estudo da escuta exigida no teste.',
    },
    {
      icon: 'QA',
      title: 'Perguntas e interações',
      description:
        'Prática direcionada para organizar respostas, ganhar fluidez e entender o que cada etapa espera do candidato.',
    },
    {
      icon: 'IMG',
      title: 'Imagens do teste',
      description:
        'Material visual para treinar descrição, interpretação e construção de respostas com mais precisão.',
    },
    {
      icon: 'SUP',
      title: 'Suporte durante o processo',
      description:
        'Acompanhamento para tirar dúvidas e possibilidade de aulas particulares conforme disponibilidade de agenda.',
    },
  ];

  steps = [
    {
      number: '01',
      title: 'Entenda o formato',
      description:
        'Comece pelas explicações de cada etapa do teste para saber exatamente como conduzir seus estudos.',
    },
    {
      number: '02',
      title: 'Pratique com material realista',
      description:
        'Use áudios, perguntas e imagens para treinar escuta, organização de resposta e vocabulário de aviação.',
    },
    {
      number: '03',
      title: 'Ajuste seus pontos fracos',
      description:
        'Revise o que ainda trava sua performance e leve dúvidas para o suporte ou para aulas particulares.',
    },
  ];
}
