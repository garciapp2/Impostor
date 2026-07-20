// Modo Campeonato: cada jogador recebe uma MISSÃO secreta na carta. Cumprir vale
// +1, conferido pelo grupo no fim da rodada.
//
// Regras de ouro de uma boa missão:
// 1. AÇÃO: dá pra decidir fazer durante a rodada (não depende de sorte nem do
//    resultado). Nada de "defenda quem for o impostor".
// 2. NEUTRA: qualquer um cumpre, impostor ou inocente. Não depende de saber quem
//    é o impostor.
// 3. VERIFICÁVEL: no fim, o grupo lembra e concorda se rolou ou não.
export interface Mission {
  id: string;
  text: string;
}

export const MISSIONS: Mission[] = [
  // --- Humor / quebrar o grupo ---
  { id: 'rir', text: 'Faça alguém rir durante a rodada.' },
  { id: 'todos-rir', text: 'Faça todo mundo rir pelo menos uma vez.' },
  { id: 'banana', text: 'Encaixe a palavra "banana" numa frase sem ninguém estranhar.' },
  { id: 'cara-seria', text: 'Mantenha a cara séria a rodada inteira, sem rir.' },
  { id: 'sotaque', text: 'Fale com um sotaque diferente sem ninguém comentar.' },
  { id: 'imita', text: 'Imite o jeito de falar de outro jogador em algum momento.' },
  { id: 'gesto', text: 'Faça um gesto bem exagerado ao dar sua dica.' },
  { id: 'exagero', text: 'Reaja de forma exagerada à dica de outra pessoa.' },

  // --- Postura / atuação ---
  { id: 'suspeito', text: 'Aja de forma suspeita e faça o grupo desconfiar de você.' },
  { id: 'calado', text: 'Fique calado até alguém te perguntar algo diretamente.' },
  { id: 'seguro', text: 'Aja com confiança absoluta, como se soubesse de tudo.' },
  { id: 'calmo', text: 'Nunca perca a calma nesta rodada, aconteça o que acontecer.' },
  { id: 'lidera', text: 'Assuma a liderança e conduza a discussão do grupo.' },
  { id: 'sem-olhar', text: 'Não olhe nos olhos de ninguém durante a rodada.' },
  { id: 'demorado', text: 'Enrole o máximo que puder antes de dar sua dica.' },
  { id: 'eu-sabia', text: 'No fim, diga "eu sabia!" com toda a confiança, tendo acertado ou não.' },

  // --- Acusação / discussão ---
  { id: 'acuse-primeiro', text: 'Seja o primeiro a acusar alguém.' },
  { id: 'defenda', text: 'Defenda a primeira pessoa que for acusada.' },
  { id: 'apoie-acusacao', text: 'Seja o primeiro a apoiar uma acusação feita por outra pessoa.' },
  { id: 'acusa-dois', text: 'Acuse duas pessoas diferentes na mesma rodada.' },
  { id: 'dramatico', text: 'Faça uma acusação dramática apontando o dedo.' },
  { id: 'muda-voto', text: 'Mude de opinião sobre quem é o impostor pelo menos uma vez.' },
  { id: 'duvida', text: 'Duvide da dica de todo mundo pelo menos uma vez.' },
  { id: 'sem-acusacao', text: 'Passe a rodada inteira sem ser acusado por ninguém.' },
  { id: 'concorde', text: 'Faça alguém concordar com uma teoria completamente absurda.' },
  { id: 'concordar-todos', text: 'Concorde com tudo que os outros disserem nesta rodada.' },
  { id: 'mudo-de-assunto', text: 'Mude de assunto no meio da discussão pelo menos uma vez.' },
  { id: 'elogio', text: 'Elogie a dica de outra pessoa antes de dar a sua.' },

  // --- Restrições na fala/dica ---
  { id: 'ne', text: 'Termine todas as suas falas com "né?".' },
  { id: 'animal', text: 'Cite um animal na sua dica de forma natural.' },
  { id: 'cita-comida', text: 'Cite uma comida na sua dica.' },
  { id: 'cita-nome', text: 'Cite o nome de outro jogador na sua dica.' },
  { id: 'rima', text: 'Faça sua dica rimar com o nome de um dos jogadores.' },
  { id: 'ingles', text: 'Dê pelo menos uma dica em inglês.' },
  { id: 'giria', text: 'Encaixe uma gíria na sua dica.' },
  { id: 'palavra-dificil', text: 'Use uma palavra difícil e rebuscada na sua fala.' },
  { id: 'curtissimo', text: 'Só fale em frases curtíssimas nesta rodada, no máximo três palavras cada.' },
];

// Sorteia `count` missões distintas (uma por jogador). Se pedir mais que o
// disponível, repete embaralhando.
export const drawMissions = (count: number): Mission[] => {
  const shuffled = [...MISSIONS].sort(() => Math.random() - 0.5);
  if (count <= shuffled.length) return shuffled.slice(0, count);
  const result: Mission[] = [];
  for (let i = 0; i < count; i++) {
    result.push(shuffled[i % shuffled.length]);
  }
  return result;
};
