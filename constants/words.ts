export interface WordCategory {
  id: string;
  name: string;
  words: string[];
}

export const CATEGORIES: WordCategory[] = [
  {
    id: 'objetos',
    name: '📦 Objetos',
    words: [
      'Abajur', 'Agulha', 'Alfinete', 'Algodão', 'Alicate', 'Almofada',
      'Ampulheta', 'Anel', 'Anzol', 'Apagador', 'Apito', 'Apontador', 'Aquário',
      'Arco', 'Armário', 'Aspirador', 'Bacia', 'Balança', 'Balão', 'Balde',
      'Bambolê', 'Banco', 'Bandeira', 'Baralho', 'Barraca', 'Batom', 'Bengala',
      'Berço', 'Bexiga', 'Binóculo', 'Biscoito', 'Bolsa', 'Boné', 'Boneca',
      'Bota', 'Botão', 'Bússola', 'Cabide', 'Cachimbo', 'Cadeira', 'Caderno',
      'Caixa', 'Calculadora', 'Cama', 'Câmera', 'Caneca', 'Caneta', 'Canivete',
      'Cano', 'Canudo', 'Capacete', 'Carimbo', 'Carrinho', 'Carta', 'Carteira',
      'Castelo', 'Catavento', 'Celular', 'Cesta', 'Chaleira', 'Chapéu', 'Chave',
      'Chinelo', 'Chupeta', 'Churrasqueira', 'Chuveiro', 'Cinto', 'Clipe', 'Cofre',
      'Colar', 'Colchão', 'Coleira', 'Colher', 'Computador', 'Cone', 'Copo',
      'Corda', 'Coroa', 'Dado', 'Dardo', 'Dentadura', 'Despertador', 'Detergente',
      'Diamante', 'Dicionário', 'Dinheiro', 'Disco', 'Dominó', 'Envelope', 'Enxada',
      'Escada', 'Escorregador', 'Escova', 'Escudo', 'Espada', 'Espelho', 'Esponja',
      'Estátua', 'Estetoscópio', 'Estojo', 'Extintor', 'Farol', 'Fechadura', 'Ferro',
      'Ficha', 'Fio', 'Fita', 'Flecha', 'Foguete', 'Fone', 'Forno', 'Frigideira',
      'Funil', 'Furadeira', 'Gaiola', 'Gancho', 'Garfo', 'Garrafa', 'Gaveta',
      'Gelo', 'Geladeira', 'Giz', 'Grampeador', 'Guarda-chuva', 'Ímã', 'Impressora',
      'Isqueiro', 'Janela', 'Jarro', 'Jaqueta', 'Joystick', 'Lâmpada', 'Lancheira',
      'Lápis', 'Lata', 'Lego', 'Lençol', 'Lente', 'Leque', 'Liquidificador',
      'Lixeira', 'Livro', 'Lousa', 'Lupa', 'Luva', 'Mala', 'Mamadeira', 'Mapa',
      'Martelo', 'Máscara', 'Medalha', 'Meia', 'Microfone', 'Microscópio', 'Mochila',
      'Mola', 'Monitor', 'Mouse', 'Óculos', 'Pá', 'Panela', 'Papel', 'Parafuso',
      'Pente', 'Perfume', 'Piano', 'Pilha', 'Pincel', 'Pinça', 'Pipa', 'Placa',
      'Pneu', 'Pote', 'Prato', 'Prego', 'Rádio', 'Relógio', 'Remédio', 'Robô',
      'Roda', 'Sabonete', 'Saco', 'Sino', 'Skate', 'Sofá', 'Talher', 'Teclado',
      'Televisão', 'Tesoura', 'Tijolo', 'Toalha', 'Torneira', 'Torradeira',
      'Travesseiro', 'Vassoura', 'Vela', 'Ventilador', 'Vidro', 'Violão', 'Webcam',
      'Xícara', 'Zíper', 'Drone', 'Controle', 'Carregador', 'Tablet', 'Headset'
    ]
  },
  {
    id: 'comida',
    name: '🍕 Comida',
    words: [
      'Abacaxi', 'Açúcar', 'Alface', 'Arroz', 'Azeitona', 'Bacon', 'Banana',
      'Batata', 'Batata frita', 'Bife', 'Bolo', 'Brócolis', 'Café', 'Camarão',
      'Carne', 'Cenoura', 'Cerveja', 'Chocolate', 'Coxinha', 'Cupcake', 'Empada',
      'Feijão', 'Frango', 'Hambúrguer', 'Hotdog', 'Lasanha', 'Leite', 'Limão',
      'Maçã', 'Macarrão', 'Melancia', 'Milho', 'Morango', 'Omelete', 'Ovo',
      'Pão', 'Pastel', 'Pepino', 'Picles', 'Pizza', 'Queijo', 'Refrigerante',
      'Risoto', 'Salada', 'Salame', 'Sanduíche', 'Sopa', 'Sorvete', 'Sushi',
      'Taco', 'Tapioca', 'Tomate', 'Torta', 'Uva', 'Vinho', 'Waffle',
      'Yakissoba', 'Açaí', 'Brigadeiro', 'Beijinho', 'Paçoca', 'Pudim'
    ]
  },
  {
    id: 'animais',
    name: '🐾 Animais',
    words: [
      'Águia', 'Alce', 'Anta', 'Arara', 'Baleia', 'Bezerro', 'Bode',
      'Cachorro', 'Cabra', 'Camarão', 'Camelo', 'Capivara', 'Caranguejo',
      'Cavalo', 'Cisne', 'Cobra', 'Coelho', 'Coruja', 'Crocodilo', 'Dinossauro',
      'Elefante', 'Foca', 'Gato', 'Girafa', 'Hamster', 'Hipopótamo', 'Jacaré',
      'Leão', 'Lhama', 'Lobo', 'Macaco', 'Morcego', 'Onça', 'Ovelha',
      'Panda', 'Papagaio', 'Pássaro', 'Pato', 'Pavão', 'Pinguim', 'Polvo',
      'Porco', 'Rato', 'Raposa', 'Rinoceronte', 'Sapo', 'Tartaruga', 'Tigre',
      'Tubarão', 'Urso', 'Vaca', 'Zebra', 'Unicórnio', 'Dragão', 'Fênix'
    ]
  },
  {
    id: 'transporte',
    name: '🚗 Transporte',
    words: [
      'Avião', 'Bicicleta', 'Barco', 'Caminhão', 'Carro', 'Canoa',
      'Drone', 'Helicóptero', 'Jetski', 'Lancha', 'Metrô', 'Moto', 'Navio',
      'Ônibus', 'Patins', 'Patinete', 'Táxi', 'Trator', 'Trem', 'Ambulância'
    ]
  },
  {
    id: 'musica',
    name: '🎵 Música',
    words: [
      'Acordeão', 'Bateria', 'Baixo', 'Banjo', 'Cavaquinho', 'Clarinete',
      'Flauta', 'Gaita', 'Guitarra', 'Harpa', 'Maraca', 'Microfone', 'Piano',
      'Pandeiro', 'Saxofone', 'Tambor', 'Trompete', 'Trombone', 'Ukulele',
      'Violão', 'Violino', 'Xilofone', 'Teclado'
    ]
  },
  {
    id: 'fantasia',
    name: '✨ Fantasia',
    words: [
      'Anjo', 'Bruxa', 'Cavaleiro', 'Centauro', 'Demônio', 'Dragão',
      'Duende', 'Elfo', 'Fada', 'Fantasma', 'Feiticeiro', 'Gênio',
      'Goblin', 'Mago', 'Medusa', 'Minotauro', 'Sereia', 'Troll',
      'Unicórnio', 'Vampiro', 'Lobisomen', 'Zumbi', 'Yeti', 'Kraken',
      'Fênix', 'Grifo', 'Esqueleto', 'Múmia'
    ]
  },
  {
    id: 'esportes',
    name: '⚽ Esportes',
    words: [
      'Atletismo', 'Badminton', 'Basquete', 'Beach-soccer', 'Beach-tennis',
      'Beisebol', 'BMX', 'Boxe', 'Breakdance', 'Capoeira',
      'Ciclismo', 'Corrida', 'Crossfit', 'Dardos', 'Escalada',
      'Esgrima', 'F1', 'Futebol', 'Futevôlei', 'Futsal',
      'Ginástica', 'Golfe', 'Halterofilismo', 'Handebol', 'Hipismo',
      'Hóquei', 'Jiu-jitsu', 'Judô', 'Karate', 'Luta-livre',
      'Maratona', 'MMA', 'Motocross', 'MTB', 'Nado-artístico',
      'Natação', 'Padel', 'Paraquedismo', 'Patinação', 'Ping-pong',
      'Remo', 'Rugby', 'Sinuca', 'Skate', 'Surfe',
      'Taekwondo', 'Tênis', 'Tiro', 'Triatlo', 'Vela',
      'Vôlei', 'Vôlei-de-praia', 'Windsurf'
    ]
  },
  {
    id: 'natureza',
    name: '🌿 Natureza',
    words: [
      'Água', 'Árvore', 'Ar', 'Arco-íris', 'Areia',
      'Aurora boreal', 'Bambu', 'Cachoeira', 'Cacto', 'Campo',
      'Caverna', 'Cogumelo', 'Cristal', 'Deserto', 'Estrela',
      'Estrela-do-mar', 'Fogo', 'Floresta', 'Flor', 'Folha',
      'Fumaça', 'Geleira', 'Gramas', 'Lago', 'Lua',
      'Montanha', 'Neve', 'Nuvem', 'Onda', 'Oceano',
      'Pedra', 'Pôr-do-sol', 'Raio', 'Relâmpago', 'Rio',
      'Rocha', 'Sol', 'Tempestade', 'Terra', 'Trilha',
      'Vento', 'Vulcão', 'Vale', 'Céu', 'Chuva',
      'Raiz', 'Semente', 'Galho', 'Casca', 'Musgo',
      'Lava', 'Gota', 'Brisa', 'Furacão', 'Tsunami'
    ]
  },
  {
    id: 'profissoes',
    name: '👨‍⚕️ Profissões',
    words: [
      'Advogado', 'Agricultor', 'Arquiteto', 'Artesão', 'Ator',
      'Babá', 'Barista', 'Barman', 'Bombeiro', 'Cabeleireiro',
      'Caixa', 'Cantor', 'Carteiro', 'Chapeiro', 'Caminhoneiro',
      'Confeiteiro', 'Contador', 'Cozinheiro', 'Dentista', 'Designer',
      'DJ', 'Economista', 'Eletricista', 'Empreendedor', 'Encanador',
      'Enfermeiro', 'Engenheiro', 'Entregador', 'Faxineiro', 'Farmacêutico',
      'Fisioterapeuta', 'Fotógrafo', 'Garçom', 'Gerente', 'Influencer',
      'Jardineiro', 'Jornalista', 'Manicure', 'Mecânico', 'Médico',
      'Motorista', 'Nutricionista', 'Padeiro', 'Pedreiro', 'Personal trainer',
      'Piloto', 'Policial', 'Porteiro', 'Professor', 'Programador',
      'Psicólogo', 'Recepcionista', 'Repositor', 'Secretário', 'Segurança',
      'Streamer', 'Vendedor', 'Veterinário', 'Vigia', 'Youtuber'
    ]
  },
  {
    id: 'nsfw',
    name: '🔞 NSFW',
    words: [
      'Pau', 'Buceta', 'Bunda', 'Peito', 'Mamilo', 'Clitóris', 'Cu',
      'Chupar', 'Boquete', 'Punheta', 'Punheteiro', 'Masturbação',
      'Transar', 'Anal', '69', 'Gangbang', 'Menage',
      'Tesão', 'Ereção', 'Pau-mole', 'Orgasmo', 'Gozo', 'Squirt',
      'Vibrador', 'Consolo', 'Plug-anal', 'Camisinha', 'Lubrificante', 'DIU',
      'Pornô', 'Nude', 'Calcinha', 'Sutiã', 'Lingerie', 'Strip', 'Fetiche', 'MDMA', 'LSD',
      'Cocaína', 'Heroína', 'Crack', 'Maconha', 'Baseado', 'K9'
    ]
  }
];

export const getAllWords = (categories: string[]): string[] => {
  const words: string[] = [];
  categories.forEach(categoryId => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (category) {
      words.push(...category.words);
    }
  });
  return words;
};

export const getCategoryForWord = (word: string): WordCategory | null => {
  for (const category of CATEGORIES) {
    if (category.words.includes(word)) {
      return category;
    }
  }
  return null;
};