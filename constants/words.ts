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
      'Abajur', 'Agulha', 'Alfinete', 'Algema', 'Algodão', 'Alicate', 'Almofada',
      'Ampulheta', 'Anel', 'Anzol', 'Apagador', 'Apito', 'Apontador', 'Aquário',
      'Arco', 'Armário', 'Aspirador', 'Bacia', 'Balança', 'Balão', 'Balde',
      'Bambolê', 'Banco', 'Bandeira', 'Baralho', 'Barbeador', 'Barraca', 'Bateria',
      'Batom', 'Bengala', 'Berço', 'Bexiga', 'Binóculo', 'Biscoito', 'Bolsa',
      'Bomba', 'Boné', 'Boneca', 'Bota', 'Botão', 'Bússola', 'Cabide', 'Cachimbo',
      'Cadeira', 'Caderno', 'Caixa', 'Calculadora', 'Cama', 'Câmera', 'Caneca',
      'Caneta', 'Canivete', 'Cano', 'Canudo', 'Capacete', 'Carimbo', 'Carrinho',
      'Carta', 'Carteira', 'Castelo', 'Catavento', 'Celular', 'Cesta', 'Chaleira',
      'Chapéu', 'Chave', 'Chicote', 'Chinelo', 'Chupeta', 'Churrasqueira', 'Chuveiro',
      'Cinto', 'Clipe', 'Cofre', 'Colar', 'Colchão', 'Coleira', 'Colher',
      'Computador', 'Cone', 'Copo', 'Corda', 'Coroa', 'Dado', 'Dardo',
      'Delineador', 'Dentadura', 'Desentupidor', 'Despertador', 'Detergente', 'Diamante',
      'Dicionário', 'Dinheiro', 'Disco', 'Dominó', 'Envelope', 'Enxada', 'Escada',
      'Escorregador', 'Escova', 'Escudo', 'Espada', 'Espelho', 'Esponja', 'Estátua',
      'Estetoscópio', 'Estojo', 'Extintor', 'Faca', 'Farol', 'Fechadura', 'Ferro',
      'Ficha', 'Filmadora', 'Fio', 'Fita', 'Fivela', 'Flecha', 'Foguete',
      'Fone', 'Forno', 'Frigideira', 'Funil', 'Furadeira', 'Gaiola', 'Gancho',
      'Garfo', 'Garrafa', 'Gaveta', 'Gelo', 'Geladeira', 'Giz', 'Grampeador',
      'Guarda-chuva', 'Ímã', 'Impressora', 'Injeção', 'Isqueiro', 'Janela', 'Jarro',
      'Jaqueta', 'Joystick', 'Lâmpada', 'Lancheira', 'Lápis', 'Lata', 'Lego',
      'Lençol', 'Lente', 'Leque', 'Liquidificador', 'Lixeira', 'Livro', 'Lousa',
      'Lupa', 'Luva', 'Mala', 'Mamadeira', 'Mapa', 'Máquina', 'Martelo',
      'Máscara', 'Medalha', 'Meia', 'Microfone', 'Microscópio', 'Mochila', 'Mola',
      'Monitor', 'Mouse', 'Óculos', 'Pá', 'Palito', 'Panela', 'Papel',
      'Parafuso', 'Pente', 'Perfume', 'Peteca', 'Piano', 'Pilha', 'Pincel',
      'Pinça', 'Pipa', 'Pistola', 'Placa', 'Pneu', 'Pote', 'Prato',
      'Prego', 'Rádio', 'Relógio', 'Remédio', 'Robô', 'Roda', 'Sabonete',
      'Saco', 'Sino', 'Skate', 'Sofá', 'Talher', 'Teclado', 'Televisão',
      'Tesoura', 'Tijolo', 'Toalha', 'Torneira', 'Torradeira', 'Travesseiro', 'Vassoura',
      'Vela', 'Ventilador', 'Vidro', 'Violão', 'Webcam', 'Xícara', 'Zíper',
      'Drone', 'Fone de ouvido', 'Controle remoto', 'Carregador', 'Tripé', 'Selfie stick',
      'Projetor', 'Pen drive', 'HD externo', 'Roteador', 'Tablet', 'Kindle', 'Cabo USB',
      'Mousepad', 'Cadeira gamer', 'Headset', 'Teclado mecânico', 'Monitor gamer'
    ]
  },
  {
    id: 'comida',
    name: '🍕 Comida',
    words: [
      'Abacaxi', 'Açúcar', 'Alface', 'Arroz', 'Azeitona', 'Bacon', 'Banana',
      'Batata', 'Batata frita', 'Bife', 'Bolo', 'Brócolis', 'Café', 'Camarão',
      'Carne', 'Cenoura', 'Cerveja', 'Chocolate', 'Coxinha', 'Cupcake', 'Empada',
      'Feijão', 'Frango', 'Hambúrguer', 'Hot dog', 'Lasanha', 'Leite', 'Limão',
      'Maçã', 'Macarrão', 'Melancia', 'Milho', 'Morango', 'Omelete', 'Ovo',
      'Pão', 'Pastel', 'Pepino', 'Picles', 'Pizza', 'Queijo', 'Refrigerante',
      'Risoto', 'Salada', 'Salame', 'Sanduíche', 'Sopa', 'Sorvete', 'Sushi',
      'Taco', 'Tapioca', 'Tomate', 'Torta', 'Uva', 'Vinho', 'Waffle',
      'Yakissoba', 'Zabaglione', 'Açaí', 'Brigadeiro', 'Beijinho', 'Paçoca', 'Pudim'
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
      'Avião', 'Bicicleta', 'Barco', 'Caminhão', 'Carro', 'Caminhão de bombeiro',
      'Caminhão de lixo', 'Canoa', 'Carrinho de mão', 'Cavalinho de pau',
      'Drone', 'Escada rolante', 'Helicóptero', 'Jet ski', 'Lancha', 'Metrô',
      'Moto', 'Navio', 'Ônibus', 'Patins', 'Patinete', 'Submarino', 'Táxi',
      'Trator', 'Trem', 'Trem-bala', 'Trem fantasma', 'Tuk-tuk', 'Vagão',
      'Balão de ar quente', 'Carroça', 'Furgão', 'Ambulância', 'Polícia', 'Moto-táxi'
    ]
  },
  {
    id: 'musica',
    name: '🎵 Música',
    words: [
      'Acordeão', 'Bateria', 'Baixo', 'Banjo', 'Cavaquinho', 'Clarinete',
      'Contrabaixo', 'Flauta', 'Gaita', 'Guitarra', 'Harpa', 'Maraca',
      'Microfone', 'Oboé', 'Órgão', 'Pandeiro', 'Piano', 'Reco-reco',
      'Saxofone', 'Sintetizador', 'Surdo', 'Tambor', 'Trompete', 'Trombone',
      'Triângulo', 'Ukulele', 'Violão', 'Violino', 'Viola', 'Xilofone',
      'Bateria eletrônica', 'Teclado', 'DJ', 'Mesa de som', 'Caixa de som'
    ]
  },
  {
    id: 'fantasia',
    name: '✨ Fantasia',
    words: [
      'Anjo', 'Bruxa', 'Cavaleiro', 'Centauro', 'Demônio', 'Dragão',
      'Duende', 'Elfo', 'Fada', 'Fantasma', 'Feiticeiro', 'Gênio',
      'Goblin', 'Mago', 'Medusa', 'Minotauro', 'Sereia', 'Troll',
      'Unicórnio', 'Vampiro', 'Werewolf', 'Zumbi', 'Yeti', 'Kraken',
      'Fênix', 'Grifo', 'Basilisco', 'Esqueleto', 'Múmia'
    ]
  },
  {
    id: 'esportes',
    name: '⚽ Esportes',
    words: [
      'Basquete', 'Futebol', 'Vôlei', 'Tênis', 'Natação', 'Corrida',
      'Ciclismo', 'Boxe', 'Judô', 'Karate', 'Skate', 'Surfe',
      'Patinação', 'Ginástica', 'Handebol', 'Rugby', 'Beisebol',
      'Golfe', 'Ping pong', 'Badminton', 'Hipismo', 'Formula 1',
      'Motocross', 'Paraquedismo', 'Escalada'
    ]
  },
  {
    id: 'natureza',
    name: '🌿 Natureza',
    words: [
      'Árvore', 'Cachoeira', 'Cacto', 'Cogumelo', 'Estrela-do-mar',
      'Flor', 'Folha', 'Montanha', 'Neve', 'Nuvem', 'Onda',
      'Pedra', 'Pôr do sol', 'Raio', 'Rio', 'Sol', 'Tempestade',
      'Trilha', 'Vulcão', 'Arco-íris', 'Lago', 'Deserto', 'Floresta',
      'Oceano', 'Geleira', 'Aurora boreal', 'Fogo', 'Fumaça'
    ]
  },
  {
    id: 'profissoes',
    name: '👨‍⚕️ Profissões',
    words: [
      'Médico', 'Enfermeiro', 'Bombeiro', 'Policial', 'Professor',
      'Cozinheiro', 'Padeiro', 'Cabeleireiro', 'Motorista', 'Piloto',
      'Arquiteto', 'Engenheiro', 'Advogado', 'Jornalista', 'Fotógrafo',
      'Ator', 'Cantor', 'DJ', 'Programador', 'Designer', 'Artesão',
      'Agricultor', 'Pescador', 'Veterinário', 'Dentista', 'Psicólogo'
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