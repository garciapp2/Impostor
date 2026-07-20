// Regra por rodada (opção do Clássico e do Cegas). No jogo base cada um já dá
// UMA palavra como dica; então as boas regras não são sobre COMO falar, e sim
// sobre QUE dica é permitida — elas apertam o clássico dilema de provar que você
// sabe a palavra sem entregá-la de graça. Nada de mímica/sussurro/gritaria.
export interface RouletteRule {
  id: string;
  title: string;
  description: string;
}

export const ROULETTE_RULES: RouletteRule[] = [
  { id: 'so-adjetivo', title: 'Só adjetivos', description: 'Sua dica tem que ser um adjetivo: uma qualidade da palavra, nunca uma coisa.' },
  { id: 'so-verbo', title: 'Só verbos', description: 'Sua dica tem que ser um verbo: o que a palavra faz ou o que se faz com ela.' },
  { id: 'mesma-inicial', title: 'Mesma inicial', description: 'Todas as dicas da rodada têm que começar com a mesma letra da primeira dica dada.' },
  { id: 'dobro', title: 'Dobro de pistas', description: 'Cada um dá duas palavras em vez de uma. Mais dica na mesa, mais corda pro impostor se enforcar.' },
  { id: 'forca', title: 'Puxa a letra', description: 'Sua dica tem que começar com a última letra da dica anterior.' },
  { id: 'rima', title: 'Na rima', description: 'Sua dica tem que rimar com a dica que veio antes.' },
  { id: 'estrangeira', title: 'Em outra língua', description: 'Sua dica tem que ser numa língua estrangeira.' },
  { id: 'so-concreto', title: 'Só o palpável', description: 'Sua dica tem que ser algo que dá pra ver ou tocar. Nada de abstração.' },
  { id: 'so-abstrato', title: 'Só o abstrato', description: 'Sua dica tem que ser uma ideia, sentimento ou conceito. Nada que dá pra pegar na mão.' },
  { id: 'numero', title: 'Com número', description: 'Sua dica tem que incluir um número (ex.: "quatro patas", "1969").' },
  { id: 'silabas', title: 'Palavra longa', description: 'Sua dica tem que ter pelo menos quatro sílabas.' },
  { id: 'pergunta', title: 'Vira pergunta', description: 'Em vez de dar a dica, faça ao grupo uma pergunta ligada à palavra.' },
  { id: 'sem-letra', title: 'Letra proibida', description: 'Sua dica não pode conter a letra: ' },
  { id: 'categoria-fechada', title: 'Categoria fechada', description: 'Toda dica tem que ser da categoria: ' },
];

const AVOID_LETTERS = 'ABCDEIMOPRST';
const CLOSED_CATEGORIES = ['cores', 'animais', 'comidas', 'objetos', 'lugares', 'partes do corpo', 'profissões'];

// Sorteia uma regra. Algumas regras precisam de um complemento sorteado (uma
// letra proibida, uma categoria) devolvido em `hint` e já embutido no texto.
export const drawRouletteRule = (): { rule: RouletteRule; hint?: string } => {
  const rule = ROULETTE_RULES[Math.floor(Math.random() * ROULETTE_RULES.length)];
  if (rule.id === 'sem-letra') {
    return { rule, hint: AVOID_LETTERS[Math.floor(Math.random() * AVOID_LETTERS.length)] };
  }
  if (rule.id === 'categoria-fechada') {
    return { rule, hint: CLOSED_CATEGORIES[Math.floor(Math.random() * CLOSED_CATEGORIES.length)] };
  }
  return { rule };
};
