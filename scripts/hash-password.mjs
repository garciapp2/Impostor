// Gera o valor de ADMIN_PASSWORD_HASH. A senha em claro nunca sai daqui.
//
//   node scripts/hash-password.mjs "minha-senha-forte"

import { scryptSync, randomBytes } from 'node:crypto';

const password = process.argv[2];
if (!password) {
  console.error('Uso: node scripts/hash-password.mjs "sua-senha"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64).toString('hex');

console.log('\nADMIN_PASSWORD_HASH=');
console.log(`scrypt$${salt.toString('hex')}$${hash}`);
console.log('\nADMIN_SECRET= (cole este valor)');
console.log(randomBytes(32).toString('hex'));
console.log('\nIP_SALT= (cole este valor)');
console.log(randomBytes(16).toString('hex'));
console.log('');
