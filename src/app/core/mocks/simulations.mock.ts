import type { CourseVm } from '../services/courses.service';
import type { LessonVm, QuestionStepVm } from '../services/lessons.service';
import type { ModuleVm } from '../services/module.service';

interface Part2Seed {
  title: string;
  context: string;
  incident: string;
  image?: string;
}

interface Part3Seed {
  title: string;
  prompt?: string;
}

const part2Seeds: Part2Seed[][] = [
  [
    { title: 'Laser durante a aproximacao', context: 'You are on approach to Hong Kong International Airport. Listen to the controller and read back.', incident: 'Someone is pointing a laser at the cockpit. Inform ATC and state that you will continue the approach.' },
    { title: 'Colisao durante o taxi', context: 'You are taxiing out at Hong Kong International Airport. Listen to ground control and read back.', incident: 'Your aircraft tail collided with another aircraft. Advise ATC and request to return to the gate.' },
    { title: 'Falha no trem de pouso', context: 'You are en route to Cancun at FL250. Listen to ATC and read back.', incident: 'The landing gear will not deploy. Request a low pass over the runway.' },
    { title: 'Bird strike apos a decolagem', context: 'You have just taken off from Chicago. Listen to the controller and read back.', incident: 'You had a bird strike and can see damage to the wing. Inform ATC and request to return.', image: 'winglet.jpg' },
    { title: 'Emergencia medica em cruzeiro', context: 'You are cruising at FL340 from Washington to Los Angeles. Listen to ATC and read back.', incident: 'A passenger has died after a suspected heart attack. Request diversion and medical services.', image: 'heart-attack.jpg' },
  ],
  [
    { title: 'Fogo na galley durante o taxi', context: 'You are taxiing out at Barcelona International Airport. Listen to ground control and read back.', incident: 'The flight attendant reports a fire in the galley. Inform ATC and request fire services.' },
    { title: 'Descompressao durante a subida', context: 'You have just taken off from Brasilia. Listen to ATC and read back.', incident: 'You have a sudden decompression caused by an air-conditioning malfunction. Report the problem and your intentions.' },
    { title: 'Turbulencia com passageiros feridos', context: 'You are cruising en route to Toronto. Listen to ATC and read back.', incident: 'After severe turbulence, passengers are injured. Request diversion to the nearest airport and medical assistance.' },
    { title: 'Incursao de pista', context: 'You are approaching runway 25L at Barcelona. Listen to tower and read back.', incident: 'There is a vehicle on the runway. Inform tower that you are going around.', image: 'runway-incursion.jpg' },
    { title: 'Baixo combustivel', context: 'You have departed Guarulhos for Mexico. Listen to ATC and read back.', incident: 'Strong headwinds caused a low-fuel situation. Request diversion to the nearest airport.', image: 'low-fuel.jpg' },
  ],
  [
    { title: 'Passageiro fumando a bordo', context: 'You have just taken off from Dubai. Listen to ATC and read back.', incident: 'A passenger started smoking onboard. Request to return and ask for police assistance.' },
    { title: 'Hail strike e para-brisa trincado', context: 'You have just taken off from Dubai. Listen to ATC and read back.', incident: 'A hail strike damaged the nose and cracked the windshield. Request to return.' },
    { title: 'Gelo e turbulencia severa', context: 'You are taking off from Frankfurt for London. Listen to ATC and read back.', incident: 'After takeoff, you encounter severe icing and turbulence. Report the problem and request to return.' },
    { title: 'Tail strike durante o taxi', context: 'You have started pushback in Dubai. Listen to ground control and read back.', incident: 'Your tail hit another aircraft and both aircraft are damaged. Request to return to the apron.', image: 'tail-collision.jpg' },
    { title: 'Fumaca na cabine', context: 'You have just taken off from Buenos Aires. Listen to ATC and read back.', incident: 'There is smoke in the passenger cabin. Report the problem and state your intentions.', image: 'smoke-in-cabin.jpg' },
  ],
  [
    { title: 'Excursao de pista', context: 'You are approaching Madrid International Airport. Listen to ATC and read back.', incident: 'After landing, a brake malfunction caused a runway overrun. Report the problem and your intentions.' },
    { title: 'Fogo no compartimento de carga', context: 'You have just taken off from Miami. Listen to ATC and read back.', incident: 'A cargo fire warning is active and dangerous goods are onboard. Request diversion to the nearest airport.' },
    { title: 'Passageiro com ferimento na cabeca', context: 'You are ready to descend toward Miami. Listen to ATC and read back.', incident: 'A passenger fell and hit his head. Request priority and medical services on the ground.' },
    { title: 'Dano no para-brisa', context: 'You have departed Rome. Listen to departures and read back.', incident: 'You can see a crack in the windshield. Inform ATC and state your intentions.', image: 'bird-strike.jpg' },
    { title: 'Objeto nao identificado', context: 'You have just taken off from Moscow. Listen to ATC and read back.', incident: 'There is an unidentified object ahead. Report it and request a deviation if necessary.', image: 'ufo.jpg' },
  ],
  [
    { title: 'Falha de freios durante o taxi', context: 'You are ready to taxi at Dallas Airport. Listen to ground control and read back.', incident: 'You have a brake failure. Report that you are holding position and request assistance.' },
    { title: 'Ditching apos bird ingestion', context: 'You are climbing out of Recife. Listen to ATC and read back.', incident: 'A bird ingestion caused the loss of both engines. Report that you need to ditch and request rescue services.' },
    { title: 'Passageiro inconsciente', context: 'You are approaching Paris. Listen to ATC and read back.', incident: 'A passenger passed out and is shaking. Report the situation and state your intentions.' },
    { title: 'Hail strike durante a descida', context: 'You are descending toward Los Angeles. Listen to ATC and read back.', incident: 'A hail strike damaged the aircraft. Report the situation and request diversion.', image: 'hail-strike.jpg' },
    { title: 'Ameaca a bordo durante o taxi', context: 'You are taxiing at SLGG. Listen to ground control and read back.', incident: 'You were informed of a possible explosive device onboard. Report the problem and request assistance.', image: 'bomb.png' },
  ],
];

const part3Seeds: Part3Seed[][] = [
  [
    { title: 'Fumaca e perda de potencia no motor' },
    { title: 'Turbulencia severa com passageira ferida' },
    { title: 'Falha nos comandos de voo' },
  ],
  [
    { title: 'Falhas no sistema eletrico' },
    { title: 'Bird ingestion em ambos os motores' },
    { title: 'Ataque cardiaco durante o taxi' },
  ],
  [
    { title: 'Turbulencia moderada em cruzeiro', prompt: 'Is it normal to experience moderate turbulence?' },
    { title: 'Estouro do pneu do trem de nariz', prompt: 'How can a tire blowout be avoided?' },
    { title: 'Superaquecimento de display com fumaca', prompt: 'Do you think this is a PAN PAN or a MAYDAY situation?' },
  ],
  [
    { title: 'Assimetria de flap e alijamento de combustivel' },
    { title: 'Passageiro indisciplinado' },
    { title: 'Baixo combustivel no circuito de espera' },
  ],
  [
    { title: 'Cafe derramado nos instrumentos' },
    { title: 'Indicacao insegura do trem de pouso' },
    { title: 'Passageira em trabalho de parto' },
  ],
];

export const MOCK_COURSES: CourseVm[] = Array.from({ length: 5 }, (_, index) => {
  const test = index + 1;
  return {
    id: 100 + test,
    code: `ICAO-TEST-${String(test).padStart(2, '0')}`,
    title: `Teste ICAO ${test}`,
    description: 'Simulado com interacao ATC, situacoes nao rotineiras e compreensao oral.',
  };
});

export const MOCK_MODULES: ModuleVm[] = MOCK_COURSES.flatMap((course, index) => {
  const test = index + 1;
  return [
    {
      id: moduleId(test, 2),
      courseId: course.id,
      code: 'PART-2',
      title: 'Parte 2 - Interacao como piloto',
      description: 'Cinco situacoes com chamada inicial, ocorrencia inesperada e confirmacao final.',
      orderIndex: 2,
      active: true,
    },
    {
      id: moduleId(test, 3),
      courseId: course.id,
      code: 'PART-3',
      title: 'Parte 3 - Compreensao oral',
      description: 'Tres dialogos entre piloto e controlador, seguidos de resposta oral.',
      orderIndex: 3,
      active: true,
    },
  ];
});

export const MOCK_LESSONS: LessonVm[] = [
  ...part2Seeds.flatMap((questions, testIndex) =>
    questions.map((seed, situationIndex) => buildPart2Lesson(testIndex + 1, situationIndex + 1, seed))
  ),
  ...part3Seeds.flatMap((questions, testIndex) =>
    questions.map((seed, situationIndex) => buildPart3Lesson(testIndex + 1, situationIndex + 1, seed))
  ),
];

function moduleId(test: number, part: number): number {
  return 1000 + test * 10 + part;
}

function lessonId(test: number, part: number, situation: number): number {
  return test * 10000 + part * 100 + situation;
}

function mediaKey(test: number, part: number, situation: number, fileName: string): string {
  return [
    'icao-tests',
    `test-${String(test).padStart(2, '0')}`,
    `part-${String(part).padStart(2, '0')}`,
    `situation-${String(situation).padStart(2, '0')}`,
    fileName,
  ].join('/');
}

function buildPart2Lesson(test: number, situation: number, seed: Part2Seed): LessonVm {
  const id = lessonId(test, 2, situation);
  const steps: QuestionStepVm[] = [
    step(id, 1, 'TEXT', 'CONTEXT', { content: seed.context }),
    step(id, 2, 'AUDIO', 'INITIAL_AUDIO', { url: mediaKey(test, 2, situation, 'initial.wav'), maxPlays: 2 }),
    step(id, 3, 'RESPONSE', 'READBACK', { content: 'Faca o readback ou responda ao controlador em voz alta.' }),
    step(id, 4, 'TEXT', 'INCIDENT', { content: seed.incident }),
  ];

  if (seed.image) {
    steps.push(step(id, 5, 'IMAGE', 'INCIDENT_IMAGE', { url: mediaKey(test, 2, situation, seed.image) }));
  }

  steps.push(
    step(id, steps.length + 1, 'RESPONSE', 'INCIDENT_RESPONSE', { content: 'Comunique o problema, apresente suas intencoes e faca o pedido necessario.' }),
    step(id, steps.length + 2, 'AUDIO', 'FOLLOW_UP_AUDIO', { url: mediaKey(test, 2, situation, 'follow-up.wav'), maxPlays: 2 }),
    step(id, steps.length + 3, 'RESPONSE', 'CONFIRM_OR_CLARIFY', { content: 'Confirme as informacoes corretas ou esclareca o que o controlador entendeu incorretamente.' })
  );

  return lesson(id, moduleId(test, 2), `Situacao ${situation} - ${seed.title}`, situation, steps);
}

function buildPart3Lesson(test: number, situation: number, seed: Part3Seed): LessonVm {
  const id = lessonId(test, 3, situation);
  const response = seed.prompt
    ? seed.prompt
    : 'Explique o que aconteceu, as intencoes do piloto e as instrucoes dadas pelo controlador.';

  return lesson(id, moduleId(test, 3), `Situacao ${situation} - ${seed.title}`, situation, [
    step(id, 1, 'TEXT', 'CONTEXT', { content: 'Ouca o dialogo completo entre piloto e controlador.' }),
    step(id, 2, 'AUDIO', 'DIALOGUE_AUDIO', { url: mediaKey(test, 3, situation, 'dialogue.wav'), maxPlays: 2 }),
    step(id, 3, 'RESPONSE', 'COMPREHENSION_RESPONSE', { content: response }),
  ]);
}

function lesson(id: number, module: number, title: string, orderIndex: number, steps: QuestionStepVm[]): LessonVm {
  return {
    id,
    moduleId: module,
    title,
    description: 'Siga as etapas na ordem e responda oralmente em ingles.',
    content: null,
    type1: null,
    type2: null,
    type3: null,
    mediaUrl1: null,
    mediaUrl2: null,
    mediaUrl3: null,
    orderIndex,
    durationSec: null,
    active: true,
    steps,
  };
}

function step(
  lesson: number,
  orderIndex: number,
  type: QuestionStepVm['type'],
  role: string,
  data: Partial<Pick<QuestionStepVm, 'content' | 'url' | 'maxPlays'>>
): QuestionStepVm {
  return {
    id: `${lesson}-${orderIndex}`,
    lessonId: lesson,
    type,
    role,
    orderIndex,
    ...data,
  };
}
