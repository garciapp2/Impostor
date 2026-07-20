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
      'Abafador', 'Abajur', 'Abridor', 'Adaptador', 'Adesivo', 'Agulha', 'Alarme', 'Alavanca', 'Alfinete',
      'Algema', 'Algodão', 'Alicate', 'Almofada', 'Altofalante', 'Amaciante', 'Ampulheta', 'Anel', 'Antena', 'Anzol',
      'Apagador', 'Aparas', 'Apito', 'Apontador', 'Aquário', 'Aquecedor', 'Arame', 'Arco', 'Armário', 'Arnês',
      'Aro', 'Aspirador', 'Assadeira', 'Avental', 'Babador', 'Bacia', 'Bafômetro', 'Balança', 'Balancim', 'Balão',
      'Balde', 'Bambolê', 'Banco', 'Bandeira', 'Banheira', 'Banqueta', 'Baralho', 'Barbeador', 'Barraca', 'Batom',
      'Baú', 'Bebedouro', 'Bengala', 'Berço', 'Bexiga', 'Binóculo', 'Biqueira', 'Biscoito', 'Bisnaga',
      'Bloco', 'Bóia', 'Bolinha', 'Bolsa', 'Bomba', 'Boné', 'Boneca', 'Borracha', 'Borrifador', 'Bota',
      'Botão', 'Botijão', 'Bracelete', 'Brinco', 'Bule', 'Bússola', 'Cabaça', 'Cabide', 'Cabo', 'Cachimbo',
      'Cadeado', 'Cadeira', 'Caderno', 'Caixa', 'Calçadeira', 'Calculadora', 'Cama', 'Câmera', 'Campainha', 'Caneca',
      'Caneta', 'Canivete', 'Cano', 'Canudo', 'Capacete', 'Capacho', 'Cápsula', 'Carimbo', 'Carregador', 'Carretel',
      'Carrinho', 'Carta', 'Carteira', 'Cartolina', 'Cartucho', 'Casa', 'Castelo', 'Catavento', 'Celular', 'Cesta',
      'Cesto', 'Chaleira', 'Chapéu', 'Chave', 'Chaveiro', 'Chinelo', 'Chocalho', 'Chupeta', 'Churrasqueira', 'Chuveirinho',
      'Chuveiro', 'Cinto', 'Clipe', 'Cobertor', 'Cofre', 'Cofrinho', 'Colar', 'Colcha', 'Colchão', 'Coleira',
      'Colher', 'Coluna', 'Computador', 'Concha', 'Cone', 'Confete', 'Controle', 'Copo', 'Corda', 'Coroa',
      'Correia', 'Cotonete', 'Coxim', 'Creme', 'Cruz', 'Cuia', 'Dado', 'Dardo', 'Dentadura', 'Desinfetante',
      'Desodorante', 'Despertador', 'Detector', 'Detergente', 'Diamante', 'Diário', 'Dicionário', 'Dinheiro', 'Disco',
      'Dominó', 'Drone', 'Ducha', 'DVD', 'Elástico', 'Embalagem', 'Engrenagem', 'Envelope', 'Enxada', 'Escada',
      'Escorregador', 'Escova', 'Escudo', 'Esfregão', 'Espada', 'Espelho', 'Espeto', 'Esponja', 'Espuma', 'Esquadro',
      'Estante', 'Estátua', 'Esteira', 'Estetoscópio', 'Estojo', 'Etiqueta', 'Exaustor', 'Extintor', 'Faca', 'Farol',
      'Fechadura', 'Ferro', 'Ficha', 'Fio', 'Fita', 'Fivela', 'Flecha', 'Fogareiro', 'Foguete',
      'Fone', 'Forno', 'Frasco', 'Frigideira', 'Frigobar', 'Fruteira', 'Funil', 'Furadeira', 'Gaiola',
      'Galão', 'Gancho', 'Garfo', 'Garrafa', 'Garrafinha', 'Gaveta', 'Gel', 'Geladeira', 'Gelo',
      'Giz', 'Globo', 'Grampeador', 'Grampo', 'Gravador', 'Guarda-chuva', 'Guindaste', 'Guirlanda', 'Haste', 'Headset',
      'Helicóptero', 'Hidratante', 'Ímã', 'Impressora', 'Incenso', 'Interruptor', 'Isca', 'Isqueiro', 'Janela',
      'Jaqueta', 'Jarra', 'Jarro', 'Jornal', 'Joystick', 'Lâmina', 'Lâmpada', 'Lancheira', 'Lanterna',
      'Lápis', 'Lata', 'Lavadora', 'Lego', 'Lenço', 'Lençol', 'Lente', 'Leque', 'Letreiro', 'Liquidificador',
      'Livro', 'Lixa', 'Lixeira', 'Lousa', 'Lupa', 'Luva', 'Mala', 'Mamadeira', 'Manta', 'Mapa',
      'Maquete', 'Marcador', 'Martelo', 'Máscara', 'Massa', 'Mastro', 'Medalha', 'Meia', 'Mel', 'Mesa',
      'Microfone', 'Microondas', 'Microscópio', 'Miniatura', 'Mochila', 'Moeda', 'Moinho', 'Mola', 'Monitor', 'Mosquiteiro',
      'Mouse', 'Mural', 'Narguilé', 'Navalha', 'Óculos', 'Organizador', 'Pá', 'Palito',
      'Panela', 'Pantufa', 'Papel', 'Parafusadeira', 'Parafuso', 'Passadeira', 'Pen', 'Pêndulo', 'Pente',
      'Perfume', 'Peruca', 'Peso', 'Peteca', 'Pia', 'Pilha', 'Pinça', 'Pincel', 'Pipa',
      'Pipoqueira', 'Pistola', 'Placa', 'Plástico', 'Plugue', 'Pneu', 'Pochete', 'Pomo', 'Porta', 'Postit',
      'Pote', 'Prateleira', 'Prato', 'Prego', 'Prendedor', 'Protetor', 'Puxador', 'Rádio', 'Rampa',
      'Ratoeira', 'Recipiente', 'Rede', 'Refil', 'Regador', 'Relógio', 'Remédio', 'Repelente', 'Revista', 'Robô',
      'Roda', 'Rolo', 'Rótulo', 'Sabonete', 'Saco', 'Saladeira', 'Sanfona', 'Scanner', 'Secador',
     'Seringa', 'Sino', 'Sofá', 'Sonda', 'Suporte', 'Tablet', 'Tábua',
      'Talher', 'Tamanco', 'Tampa', 'Tapete', 'Tecido', 'Teclado', 'Tela', 'Televisão', 'Tenda', 'Termo',
      'Termômetro', 'Tesoura', 'Tigela', 'Tijolo', 'Tinta', 'Tira', 'Toalha', 'Toalheiro', 'Tomada', 'Torneira',
      'Torradeira', 'Travesseiro', 'Troféu', 'Tubo', 'Tule', 'Urna', 'Vara', 'Vaso', 'Vassoura',
      'Vela', 'Velcro', 'Ventilador', 'Véu', 'Vidro', 'Vitrine', 'Volante', 'Webcam', 'Xampu',
      'Xícara', 'Zarabatana', 'Zíper'
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
      'Tubarão', 'Urso', 'Vaca', 'Zebra'
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
      'Acordeão', 'Axé', 'Bateria', 'Baixo', 'Banjo',
      'Bossa Nova', 'Cavaquinho', 'Clarinete', 'Eletrônica', 'Flamengo',
      'Flauta', 'Forró', 'Funk', 'Gaita', 'Guitarra',
      'Harpa', 'Hip Hop', 'Jazz', 'Maraca', 'MPB',
      'Microfone', 'Pagode', 'Pandeiro', 'Piano', 'Pop',
      'Rap', 'Reggae', 'Rock', 'Samba', 'Saxofone',
      'Sertanejo', 'Tambor', 'Teclado', 'Trap', 'Trompete',
      'Trombone', 'Ukulele', 'Violão', 'Violino', 'Xilofone'
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
      'Maratona', 'MMA', 'Motocross',
      'Natação', 'Paraquedismo', 'Patinação', 'Ping-pong',
      'Remo', 'Rugby', 'Sinuca', 'Skate', 'Surfe',
      'Taekwondo', 'Tênis', 'Tiro', 'Triatlo', 'Vela',
      'Vôlei', 'Windsurf'
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
      'Fumaça', 'Geleira', 'Grama', 'Lago', 'Lua',
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
      'Boquete', 'Punheta', 'Punheteiro', 'Masturbação',
      'Transar', 'Anal', '69', 'Gangbang', 'Menage',
      'Tesão', 'Ereção', 'Pau-mole', 'Orgasmo', 'Gozo', 'Squirt',
      'Vibrador', 'Consolo', 'Plug-anal', 'Camisinha', 'Lubrificante', 'DIU',
      'Pornô', 'Nude', 'Calcinha', 'Sutiã', 'Lingerie', 'Strip', 'Fetiche', 'MDMA', 'LSD',
      'Cocaína', 'Heroína', 'Crack', 'Maconha', 'Baseado', 'K9'
    ]
  }
];

export const getAllWords = (categories: string[], customCategories?: import('../types').CustomCategory[]): string[] => {
  const words: string[] = [];
  categories.forEach(categoryId => {
    // Primeiro verifica nas categorias padrão
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (category) {
      words.push(...category.words);
    } else if (customCategories) {
      // Depois verifica nas categorias customizadas
      const customCategory = customCategories.find(c => c.id === categoryId);
      if (customCategory) {
        words.push(...customCategory.words);
      }
    }
  });
  return words;
};

export const getCategoryForWord = (word: string, customCategories?: import('../types').CustomCategory[]): WordCategory | null => {
  // Primeiro verifica nas categorias padrão
  for (const category of CATEGORIES) {
    if (category.words.includes(word)) {
      return category;
    }
  }
  // Depois verifica nas categorias customizadas
  if (customCategories) {
    for (const category of customCategories) {
      if (category.words.includes(word)) {
        return {
          id: category.id,
          name: category.name,
          words: category.words
        };
      }
    }
  }
  return null;
};