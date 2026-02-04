import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ler o arquivo words.ts
const wordsFile = join(__dirname, 'constants', 'words.ts');
const content = readFileSync(wordsFile, 'utf-8');

// Extrair todas as palavras de todas as categorias
const wordsMap = new Map(); // palavra -> array de categorias onde aparece
const categoryWords = [];

// Regex melhorado para encontrar arrays de palavras (suporta múltiplas linhas)
const categoryRegex = /id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],\s*words:\s*\[([\s\S]*?)\]/g;
let match;

while ((match = categoryRegex.exec(content)) !== null) {
  const categoryId = match[1];
  const categoryName = match[2];
  const wordsString = match[3];
  
  // Extrair palavras individuais (removendo aspas, espaços e quebras de linha)
  const words = wordsString
    .split(/[,\n]/)
    .map(w => w.trim().replace(/^['"]|['"]$/g, ''))
    .filter(w => w.length > 0 && !w.match(/^\s*$/));
  
  categoryWords.push({ id: categoryId, name: categoryName, words });
  
  // Registrar cada palavra (case-insensitive para detectar variações)
  words.forEach(word => {
    const normalizedWord = word.trim();
    if (!wordsMap.has(normalizedWord)) {
      wordsMap.set(normalizedWord, []);
    }
    wordsMap.get(normalizedWord).push({ id: categoryId, name: categoryName });
  });
}

// Encontrar duplicatas
const duplicates = [];
wordsMap.forEach((categories, word) => {
  if (categories.length > 1) {
    duplicates.push({
      word,
      categories: categories.map(c => `${c.name} (${c.id})`),
      count: categories.length
    });
  }
});

// Ordenar por número de ocorrências (mais duplicatas primeiro)
duplicates.sort((a, b) => b.count - a.count);

// Exibir resultados
console.log('='.repeat(60));
console.log('PALAVRAS DUPLICADAS ENCONTRADAS');
console.log('='.repeat(60));
console.log(`\nTotal de palavras únicas: ${wordsMap.size}`);
console.log(`Total de duplicatas: ${duplicates.length}\n`);

if (duplicates.length === 0) {
  console.log('✅ Nenhuma palavra duplicada encontrada!');
} else {
  console.log('Duplicatas encontradas:\n');
  duplicates.forEach((dup, index) => {
    console.log(`${index + 1}. "${dup.word}"`);
    console.log(`   Aparece em ${dup.count} categoria(s):`);
    dup.categories.forEach(cat => {
      console.log(`   - ${cat}`);
    });
    console.log('');
  });
  
  console.log('='.repeat(60));
  console.log(`\nTotal: ${duplicates.length} palavra(s) duplicada(s)`);
  
  // Estatísticas adicionais
  const totalOccurrences = duplicates.reduce((sum, dup) => sum + dup.count, 0);
  const extraOccurrences = totalOccurrences - duplicates.length;
  console.log(`Total de ocorrências extras: ${extraOccurrences}`);
}
