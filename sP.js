const fs = require("fs");

// === LISTAS DE NOMES E SOBRENOMES BRASILEIROS (75 nomes + 50 sobrenomes) ===
const nomes = [
  "Ana", "José", "Beatriz", "João", "Camila", "Antonio", "Daniela", "Francisco", "Eduarda", "Carlos",
  "Fernanda", "Paulo", "Gabriela", "Pedro", "Helena", "Lucas", "Isabela", "Gabriel", "Julia", "Matheus",
  "Larissa", "Eduardo", "Luana", "Rafael", "Manuela", "Felipe", "Natalia", "Bruno", "Olivia", "Gustavo",
  "Pietra", "Henrique", "Quiteria", "Vinicius", "Sofia", "Diego", "Tatiana", "Thiago", "Ursula", "Rodrigo",
  "Valentina", "Leonardo", "Vitoria", "Victor", "Alice", "Marcelo", "Bruna", "André", "Clara", "Fernando",
  "Debora", "Ricardo", "Emanuelle", "Alexandre", "Fabiana", "Danilo", "Giovana", "Igor", "Hilda", "Julio",
  "Ingrid", "Marcos", "Jessica", "Nelson", "Karla", "Otavio", "Livia", "Pablo", "Marina", "Renato",
  "Nadia", "Silvio", "Olimpia", "Tadeu", "Patricia", "Umberto"
];

const sobrenomes = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Almeida", "Pereira", "Costa", "Carvalho",
  "Gomes", "Martins", "Rocha", "Lima", "Ribeiro", "Araújo", "Barbosa", "Cardoso", "Correia", "Dias",
  "Freitas", "Gonçalves", "Jesus", "Lopes", "Machado", "Marques", "Mendes", "Monteiro", "Nascimento", "Nunes",
  "Pinheiro", "Ramos", "Reis", "Sousa", "Vieira", "Xavier", "Alves", "Batista", "Castro", "Duarte",
  "Fernandes", "Guimarães", "Henriques", "Moreira", "Moura", "Pinto", "Teixeira", "Viana", "Domingues", "Fonseca"
];

// === CONFIGURAÇÃO DE EMPRESAS E CENTROS DE CUSTO ===
const regrasCentroCusto = {
  1: [1, 2, 3, 4],    // Empresa 1 → centros 1, 2, 3
};

// === DADOS GENÉRICOS ===
const bairros = ["Centro", "Cajazeiras", "Brotas", "Pituba", "Barra", "Itapuã", "Stiep", "Ondina", "Rio Vermelho", "Graça"];
const cidades = ["Salvador", "Lauro de Freitas", "Camaçari"];
const ruas = ["Avenida Paulista", "Rua das Flores", "Avenida Oceânica", "Rua Chile", "Avenida Sete de Setembro", "Rua Carlos Gomes"];

// === FUNÇÕES AUXILIARES ===
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatPhone(n) {
  return `71 9${String(n).padStart(8, "0")}`;
}

function randomTimeBefore8() {
  const hour = randomNumber(6, 7);
  const minute = randomNumber(0, 59);
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

// === GERAÇÃO DOS 100 PASSAGEIROS ===
const passageiros = [];

for (let i = 101; i <= 150; i++) {
  const nome = randomItem(nomes);
  const sobrenome = randomItem(sobrenomes);
  const nomeCompleto = `${nome} ${sobrenome}`;
  const email = `${nome.toLowerCase()}${sobrenome.toLowerCase()}${crypto.randomUUID()}@mail.com`;

  // Distribuição equilibrada entre as 3 empresas
  // const empresaClienteId = ((i - 1) % 3) + 1; // 1, 2, 3, 1, 2, 3...
  const empresaClienteId = 1; // 1, 2, 3, 1, 2, 3...
  const centrosDisponiveis = regrasCentroCusto[empresaClienteId];
  // const centroCustoClienteId = randomItem(centrosDisponiveis);
  const centroCustoClienteId = randomNumber(1,4);

  const seedFoto = randomNumber(1000, 9999);
  const fotoPerfil = `https://picsum.photos/seed/${seedFoto}/200`;

  passageiros.push({
    centroCustoClienteId,
    email,
    empresaClienteId,
    fotoPerfilPassageiro: fotoPerfil,
    matricula: `MAT${String(i).padStart(4, "0")}`,
    telefone: formatPhone(80000000 + i),
    nome: nomeCompleto,
    ativo: true,
    endBairro: randomItem(bairros),
    endCidade: randomItem(cidades),
    endNumero: randomNumber(10, 999).toString(),
    endRua: randomItem(ruas),
    horarioEmbarque: randomTimeBefore8(),
    pontoApanha: `Ponto ${randomNumber(1, 25)} - ${randomItem(bairros)}`,
  });
}

// === SALVA O ARQUIVO ===
fs.writeFileSync("passageiros.json", JSON.stringify(passageiros, null, 2), "utf-8");
console.log("Arquivo passageiros.json gerado com sucesso! 100 passageiros criados com nomes reais, endereços, fotos e horários antes das 8h");