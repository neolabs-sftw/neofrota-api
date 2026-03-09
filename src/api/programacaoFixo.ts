import { prisma } from "../prisma";

export async function ProgramacaoDia() {
  const hoje = new Date().getDay();

  // Mapeia o número do dia para o nome da coluna no Prisma
  const diasDaSemanaMap = [
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
  ];
  const colunaDiaAtual = diasDaSemanaMap[hoje]; // Ex: Retorna 'segunda'

  // Busca apenas os modelos ativos que devem rodar HOJE
  const modelosParaHoje = await prisma.modeloVoucherFixo.findMany({
    where: {
      ativo: true,
      [colunaDiaAtual]: true, // A magia acontece aqui! Filtra direto no DB.
    },
    include: {
      empresaCliente: true,
      unidadeCliente: true,
      configuracoes: {
        include: {
          motorista: true,
        },
      },
    },
  });
  console.dir(modelosParaHoje, { depth: null, colors: true });
  return;
}
