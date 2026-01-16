import type { INews } from '@app/entities/News';

export const NEWS: INews[] = [
  {
    id: 'asdas',
    title:
      'UFC Quixadá promove semana de inovação e tecnologia com palestras e workshops',
    description:
      'O evento reunirá pesquisadores, estudantes e profissionais da área de tecnologia para discutir as últimas tendências em inteligência artificial, ciência de dados e desenvolvimento de software.',
    imageUrl:
      'https://images.unsplash.com/photo-1718286703248-d6cedd7d7b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnJhemlsfGVufDF8fHx8MTc2NTQ3NDg3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    publicationDate: new Date().toISOString(),
    editor: 'Redação Ufc',
    tag: {
      id: 'sdasd',
      name: 'destaque',
    },
  },
  {
    id: 'asdas',
    title:
      'Projeto de extensão leva programação para escolas públicas de Quixadá',
    description:
      'Iniciativa visa democratizar o acesso ao conhecimento tecnológico e despertar vocações na área de computação.',
    imageUrl:
      'https://images.unsplash.com/photo-1765445666604-591364f64599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGVjaG5vbG9neSUyMHN0dWRlbnRzfGVufDF8fHx8MTc2NTQ3NDg3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    publicationDate: new Date().toISOString(),
    editor: 'Maria Costa',
    tag: {
      id: 'jd',
      name: 'extensão',
    },
  },
  {
    id: 'asdas',
    title:
      'Pesquisadores desenvolvem sistema de IA para detecção precoce de doenças',
    description:
      'Projeto interdisciplinar une tecnologia e saúde para criar soluções inovadoras que podem salvar vidas.',
    imageUrl:
      'https://images.unsplash.com/photo-1765445666604-591364f64599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGVjaG5vbG9neSUyMHN0dWRlbnRzfGVufDF8fHx8MTc2NTQ3NDg3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    publicationDate: new Date().toISOString(),
    editor: 'Prof. Silva',
    tag: {
      id: '003',
      name: 'pesquisa',
    },
  },
];
