export interface SpyLocation {
  id: string;
  name: string;
  roles: string[];
}

// Locais para o modo Espião (estilo Spyfall).
// Cada local tem uma lista de funções que podem ser atribuídas aos jogadores.
export const LOCATIONS: SpyLocation[] = [
  {
    id: 'praia',
    name: 'Praia',
    roles: ['Salva-vidas', 'Turista', 'Vendedor de picolé', 'Surfista', 'Fotógrafo', 'Pescador', 'Banhista'],
  },
  {
    id: 'hospital',
    name: 'Hospital',
    roles: ['Médico', 'Enfermeiro', 'Paciente', 'Cirurgião', 'Recepcionista', 'Visitante', 'Maqueiro'],
  },
  {
    id: 'escola',
    name: 'Escola',
    roles: ['Professor', 'Aluno', 'Diretor', 'Faxineiro', 'Merendeira', 'Inspetor', 'Bibliotecária'],
  },
  {
    id: 'restaurante',
    name: 'Restaurante',
    roles: ['Chef', 'Garçom', 'Cliente', 'Lavador de pratos', 'Gerente', 'Sommelier', 'Recepcionista'],
  },
  {
    id: 'aviao',
    name: 'Avião',
    roles: ['Piloto', 'Comissário', 'Passageiro', 'Copiloto', 'Turista', 'Executivo', 'Bebê'],
  },
  {
    id: 'cassino',
    name: 'Cassino',
    roles: ['Crupiê', 'Apostador', 'Segurança', 'Bartender', 'Gerente', 'Turista', 'Trapaceiro'],
  },
  {
    id: 'estacao-espacial',
    name: 'Estação Espacial',
    roles: ['Astronauta', 'Cientista', 'Comandante', 'Engenheiro', 'Turista espacial', 'Médico de bordo', 'Técnico'],
  },
  {
    id: 'banco',
    name: 'Banco',
    roles: ['Gerente', 'Caixa', 'Cliente', 'Segurança', 'Assaltante', 'Investidor', 'Faxineiro'],
  },
  {
    id: 'cinema',
    name: 'Cinema',
    roles: ['Bilheteiro', 'Espectador', 'Projecionista', 'Vendedor de pipoca', 'Segurança', 'Fã', 'Faxineiro'],
  },
  {
    id: 'navio-pirata',
    name: 'Navio Pirata',
    roles: ['Capitão', 'Marujo', 'Prisioneiro', 'Cozinheiro', 'Vigia', 'Tesoureiro', 'Contramestre'],
  },
  {
    id: 'circo',
    name: 'Circo',
    roles: ['Palhaço', 'Malabarista', 'Domador', 'Trapezista', 'Espectador', 'Mágico', 'Vendedor'],
  },
  {
    id: 'estadio',
    name: 'Estádio de Futebol',
    roles: ['Jogador', 'Torcedor', 'Juiz', 'Técnico', 'Goleiro', 'Repórter', 'Vendedor ambulante'],
  },
  {
    id: 'museu',
    name: 'Museu',
    roles: ['Guia', 'Visitante', 'Segurança', 'Curador', 'Artista', 'Estudante', 'Restaurador'],
  },
  {
    id: 'supermercado',
    name: 'Supermercado',
    roles: ['Caixa', 'Cliente', 'Repositor', 'Gerente', 'Segurança', 'Açougueiro', 'Promotor'],
  },
  {
    id: 'hotel',
    name: 'Hotel',
    roles: ['Recepcionista', 'Hóspede', 'Camareira', 'Gerente', 'Carregador', 'Turista', 'Chef'],
  },
  {
    id: 'delegacia',
    name: 'Delegacia',
    roles: ['Delegado', 'Policial', 'Detento', 'Advogado', 'Vítima', 'Testemunha', 'Escrivão'],
  },
  {
    id: 'estudio-tv',
    name: 'Estúdio de TV',
    roles: ['Apresentador', 'Câmera', 'Diretor', 'Convidado', 'Maquiador', 'Produtor', 'Plateia'],
  },
  {
    id: 'trem',
    name: 'Trem',
    roles: ['Maquinista', 'Passageiro', 'Cobrador', 'Turista', 'Vendedor', 'Segurança', 'Fiscal'],
  },
  {
    id: 'academia',
    name: 'Academia',
    roles: ['Personal trainer', 'Aluno', 'Recepcionista', 'Nutricionista', 'Instrutor', 'Faxineiro', 'Fisiculturista'],
  },
  {
    id: 'zoologico',
    name: 'Zoológico',
    roles: ['Veterinário', 'Visitante', 'Tratador', 'Guia', 'Fotógrafo', 'Bilheteiro', 'Biólogo'],
  },
  {
    id: 'base-militar',
    name: 'Base Militar',
    roles: ['General', 'Soldado', 'Espião', 'Médico', 'Cozinheiro', 'Recruta', 'Sentinela'],
  },
  {
    id: 'submarino',
    name: 'Submarino',
    roles: ['Capitão', 'Marinheiro', 'Engenheiro', 'Cozinheiro', 'Sonarista', 'Médico', 'Oficial'],
  },
  {
    id: 'show-de-rock',
    name: 'Show de Rock',
    roles: ['Vocalista', 'Fã', 'Segurança', 'Roadie', 'Baterista', 'Vendedor', 'Fotógrafo'],
  },
  {
    id: 'aeroporto',
    name: 'Aeroporto',
    roles: ['Piloto', 'Passageiro', 'Comissário', 'Segurança', 'Atendente', 'Turista', 'Bagageiro'],
  },
  {
    id: 'fazenda',
    name: 'Fazenda',
    roles: ['Fazendeiro', 'Vaqueiro', 'Veterinário', 'Peão', 'Turista', 'Ordenhador', 'Tratorista'],
  },
  {
    id: 'estacao-esqui',
    name: 'Estação de Esqui',
    roles: ['Instrutor', 'Turista', 'Atendente', 'Fotógrafo', 'Médico', 'Esquiador', 'Operador do teleférico'],
  },
  {
    id: 'padaria',
    name: 'Padaria',
    roles: ['Padeiro', 'Cliente', 'Atendente', 'Confeiteiro', 'Caixa', 'Entregador', 'Gerente'],
  },
  {
    id: 'farmacia',
    name: 'Farmácia',
    roles: ['Farmacêutico', 'Cliente', 'Atendente', 'Caixa', 'Entregador', 'Gerente', 'Balconista'],
  },
  {
    id: 'shopping',
    name: 'Shopping',
    roles: ['Lojista', 'Cliente', 'Segurança', 'Faxineiro', 'Gerente', 'Promotor', 'Turista'],
  },
  {
    id: 'aquario',
    name: 'Aquário',
    roles: ['Biólogo marinho', 'Visitante', 'Mergulhador', 'Guia', 'Tratador', 'Fotógrafo', 'Bilheteiro'],
  },
  {
    id: 'parque-diversoes',
    name: 'Parque de Diversões',
    roles: ['Operador de brinquedo', 'Visitante', 'Vendedor', 'Mascote', 'Segurança', 'Fotógrafo', 'Bilheteiro'],
  },
  {
    id: 'igreja',
    name: 'Igreja',
    roles: ['Padre', 'Fiel', 'Coroinha', 'Organista', 'Sacristão', 'Turista', 'Coralista'],
  },
  {
    id: 'tribunal',
    name: 'Tribunal',
    roles: ['Juiz', 'Advogado', 'Réu', 'Promotor', 'Jurado', 'Escrivão', 'Testemunha'],
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca',
    roles: ['Bibliotecário', 'Estudante', 'Pesquisador', 'Faxineiro', 'Visitante', 'Escritor', 'Segurança'],
  },
  {
    id: 'universidade',
    name: 'Universidade',
    roles: ['Professor', 'Estudante', 'Reitor', 'Pesquisador', 'Bibliotecário', 'Faxineiro', 'Calouro'],
  },
  {
    id: 'metro',
    name: 'Estação de Metrô',
    roles: ['Passageiro', 'Segurança', 'Bilheteiro', 'Músico de rua', 'Fiscal', 'Turista', 'Faxineiro'],
  },
  {
    id: 'feira-livre',
    name: 'Feira Livre',
    roles: ['Feirante', 'Cliente', 'Vendedor de frutas', 'Açougueiro', 'Músico', 'Fiscal', 'Turista'],
  },
  {
    id: 'barbearia',
    name: 'Barbearia',
    roles: ['Barbeiro', 'Cliente', 'Recepcionista', 'Manicure', 'Aprendiz', 'Dono', 'Entregador'],
  },
  {
    id: 'salao-beleza',
    name: 'Salão de Beleza',
    roles: ['Cabeleireiro', 'Cliente', 'Manicure', 'Maquiadora', 'Recepcionista', 'Esteticista', 'Dono'],
  },
  {
    id: 'estudio-tatuagem',
    name: 'Estúdio de Tatuagem',
    roles: ['Tatuador', 'Cliente', 'Recepcionista', 'Aprendiz', 'Body piercer', 'Dono', 'Visitante'],
  },
  {
    id: 'balada',
    name: 'Balada',
    roles: ['DJ', 'Frequentador', 'Segurança', 'Bartender', 'Garçom', 'Promoter', 'Dançarino'],
  },
  {
    id: 'bar',
    name: 'Bar',
    roles: ['Bartender', 'Cliente', 'Garçom', 'Músico', 'Segurança', 'Dono', 'Cozinheiro'],
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    roles: ['Barista', 'Cliente', 'Garçom', 'Caixa', 'Gerente', 'Estudante', 'Entregador'],
  },
  {
    id: 'bombeiros',
    name: 'Estação de Bombeiros',
    roles: ['Bombeiro', 'Capitão', 'Motorista', 'Recruta', 'Despachante', 'Paramédico', 'Voluntário'],
  },
  {
    id: 'obra',
    name: 'Canteiro de Obras',
    roles: ['Pedreiro', 'Engenheiro', 'Arquiteto', 'Mestre de obras', 'Servente', 'Operador de guindaste', 'Eletricista'],
  },
  {
    id: 'fabrica',
    name: 'Fábrica',
    roles: ['Operário', 'Supervisor', 'Engenheiro', 'Gerente', 'Técnico', 'Faxineiro', 'Inspetor de qualidade'],
  },
  {
    id: 'escritorio',
    name: 'Escritório',
    roles: ['Gerente', 'Estagiário', 'Recepcionista', 'Contador', 'Analista', 'Faxineiro', 'Chefe'],
  },
  {
    id: 'teatro',
    name: 'Teatro',
    roles: ['Ator', 'Diretor', 'Espectador', 'Iluminador', 'Sonoplasta', 'Bilheteiro', 'Camareiro'],
  },
  {
    id: 'laboratorio',
    name: 'Laboratório',
    roles: ['Cientista', 'Assistente', 'Estagiário', 'Técnico', 'Pesquisador', 'Supervisor', 'Segurança'],
  },
  {
    id: 'consultorio-dentista',
    name: 'Consultório Odontológico',
    roles: ['Dentista', 'Paciente', 'Auxiliar', 'Recepcionista', 'Ortodontista', 'Higienista', 'Gerente'],
  },
  {
    id: 'clinica-veterinaria',
    name: 'Clínica Veterinária',
    roles: ['Veterinário', 'Cliente', 'Auxiliar', 'Recepcionista', 'Tosador', 'Dono do pet', 'Estagiário'],
  },
  {
    id: 'petshop',
    name: 'Petshop',
    roles: ['Vendedor', 'Cliente', 'Tosador', 'Veterinário', 'Caixa', 'Gerente', 'Banhista de pet'],
  },
  {
    id: 'clube-piscina',
    name: 'Clube (Piscina)',
    roles: ['Salva-vidas', 'Nadador', 'Instrutor', 'Sócio', 'Garçom', 'Faxineiro', 'Criança'],
  },
  {
    id: 'boliche',
    name: 'Pista de Boliche',
    roles: ['Jogador', 'Atendente', 'Bartender', 'Mecânico de pista', 'Espectador', 'Aniversariante', 'Gerente'],
  },
  {
    id: 'trilha',
    name: 'Trilha na Montanha',
    roles: ['Alpinista', 'Guia', 'Turista', 'Fotógrafo', 'Guarda florestal', 'Mochileiro', 'Socorrista'],
  },
  {
    id: 'selva',
    name: 'Selva',
    roles: ['Explorador', 'Biólogo', 'Guia', 'Indígena', 'Fotógrafo', 'Caçador', 'Botânico'],
  },
  {
    id: 'ilha-deserta',
    name: 'Ilha Deserta',
    roles: ['Náufrago', 'Explorador', 'Piloto', 'Turista', 'Sobrevivencialista', 'Pescador', 'Cientista'],
  },
  {
    id: 'iate',
    name: 'Iate de Luxo',
    roles: ['Capitão', 'Milionário', 'Tripulante', 'Convidado', 'Chef', 'DJ', 'Segurança'],
  },
  {
    id: 'porto',
    name: 'Porto',
    roles: ['Estivador', 'Marinheiro', 'Capitão', 'Pescador', 'Inspetor aduaneiro', 'Turista', 'Comerciante'],
  },
  {
    id: 'plataforma-petroleo',
    name: 'Plataforma de Petróleo',
    roles: ['Operador', 'Engenheiro', 'Mergulhador', 'Cozinheiro', 'Supervisor', 'Técnico', 'Piloto de helicóptero'],
  },
  {
    id: 'usina-nuclear',
    name: 'Usina Nuclear',
    roles: ['Engenheiro', 'Técnico', 'Físico', 'Segurança', 'Operador', 'Inspetor', 'Diretor'],
  },
  {
    id: 'loja-games',
    name: 'Loja de Games',
    roles: ['Vendedor', 'Cliente', 'Caixa', 'Gamer', 'Gerente', 'Streamer', 'Colecionador'],
  },
  {
    id: 'arena-esports',
    name: 'Arena de eSports',
    roles: ['Jogador profissional', 'Torcedor', 'Comentarista', 'Técnico', 'Streamer', 'Organizador', 'Segurança'],
  },
  {
    id: 'radio',
    name: 'Estação de Rádio',
    roles: ['Locutor', 'Produtor', 'DJ', 'Técnico de som', 'Convidado', 'Repórter', 'Estagiário'],
  },
  {
    id: 'redacao-jornal',
    name: 'Redação de Jornal',
    roles: ['Repórter', 'Editor', 'Fotógrafo', 'Diagramador', 'Estagiário', 'Colunista', 'Chefe de redação'],
  },
  {
    id: 'vinicola',
    name: 'Vinícola',
    roles: ['Enólogo', 'Turista', 'Colhedor de uvas', 'Sommelier', 'Guia', 'Proprietário', 'Barman'],
  },
  {
    id: 'camping',
    name: 'Camping',
    roles: ['Campista', 'Guia', 'Escoteiro', 'Guarda florestal', 'Turista', 'Cozinheiro', 'Socorrista'],
  },
  {
    id: 'safari',
    name: 'Safári',
    roles: ['Guia', 'Turista', 'Motorista', 'Fotógrafo', 'Biólogo', 'Guarda', 'Rastreador'],
  },
  {
    id: 'mina',
    name: 'Mina',
    roles: ['Mineiro', 'Engenheiro', 'Supervisor', 'Geólogo', 'Operador de máquina', 'Segurança', 'Socorrista'],
  },
  {
    id: 'observatorio',
    name: 'Observatório',
    roles: ['Astrônomo', 'Estudante', 'Visitante', 'Técnico', 'Pesquisador', 'Guia', 'Fotógrafo'],
  },
  {
    id: 'spa',
    name: 'Spa',
    roles: ['Massagista', 'Cliente', 'Recepcionista', 'Esteticista', 'Gerente', 'Terapeuta', 'Faxineiro'],
  },
  {
    id: 'casamento',
    name: 'Casamento',
    roles: ['Noivo', 'Noiva', 'Celebrante', 'Convidado', 'Fotógrafo', 'DJ', 'Garçom'],
  },
  {
    id: 'aniversario',
    name: 'Festa de Aniversário',
    roles: ['Aniversariante', 'Convidado', 'Animador', 'Anfitrião', 'Palhaço', 'Fotógrafo', 'Garçom'],
  },
  {
    id: 'prisao',
    name: 'Prisão',
    roles: ['Detento', 'Guarda', 'Diretor', 'Advogado', 'Cozinheiro', 'Visitante', 'Capelão'],
  },
  {
    id: 'estudio-danca',
    name: 'Estúdio de Dança',
    roles: ['Bailarino', 'Professor', 'Aluno', 'Coreógrafo', 'Pianista', 'Recepcionista', 'Visitante'],
  },
  {
    id: 'parque-aquatico',
    name: 'Parque Aquático',
    roles: ['Salva-vidas', 'Visitante', 'Operador de tobogã', 'Vendedor', 'Criança', 'Fotógrafo', 'Socorrista'],
  },
  {
    id: 'hotel-fazenda',
    name: 'Hotel Fazenda',
    roles: ['Hóspede', 'Caseiro', 'Guia', 'Cozinheiro', 'Instrutor de cavalgada', 'Recepcionista', 'Criança'],
  },
  {
    id: 'set-cinema',
    name: 'Set de Filmagem',
    roles: ['Ator', 'Diretor', 'Câmera', 'Roteirista', 'Figurante', 'Maquiador', 'Produtor'],
  },
  {
    id: 'data-center',
    name: 'Data Center',
    roles: ['Administrador de sistemas', 'Técnico', 'Segurança', 'Engenheiro', 'Estagiário', 'Gerente', 'Eletricista'],
  },
];

export const getLocationNames = (): string[] => LOCATIONS.map(l => l.name);

export const getLocationByName = (name: string): SpyLocation | null =>
  LOCATIONS.find(l => l.name === name) || null;
