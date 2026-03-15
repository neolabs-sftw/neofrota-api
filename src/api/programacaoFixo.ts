import { TipoCorrida } from "@prisma/client";
import { prisma } from "../prisma";

export async function ProgramacaoDia() {
  console.log("Iniciou aqui");

  const hoje = new Date().getDay();

  console.log("Hoje é:", hoje);

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

  console.log("Coluna atual:", colunaDiaAtual);

  // Busca apenas os modelos ativos que devem rodar HOJE
  const modelosParaHoje = await prisma.modeloVoucherFixo.findMany({
    where: {
      ativo: true,
      configuracoes: {
        some: {
          [colunaDiaAtual]: true, // A magia agora acontece na tabela certa!
        },
      },
    },
    include: {
      empresaCliente: true,
      unidadeCliente: true,
      passageirosFixos: true,
      pedagio: true,
      configuracoes: {
        where: {
          [colunaDiaAtual]: true,
        },
        include: {
          motorista: true,
          carro: true,
        },
      },
    },
  });

  for (const modelo of modelosParaHoje) {
    console.log(modelo.nomeModelo);

    for (const config of modelo.configuracoes) {
      const voucherData = {
        adminUsuarioId: modelo.adminUsuarioId,
        carroId: config.carroId,
        dataHoraProgramado: config.horario,
        destino: config.destino,
        empresaClienteId: modelo.empresaClienteId,
        modeloFixoId: modelo.id,
        motoristaId: config.motoristaId,
        natureza: "Fixo",
        operadoraId: modelo.operadoraId,
        origem: config.origem,
        passageiros: modelo.passageirosFixos.map((passageiro) => ({
          passageiroId: passageiro.passageiroId,
        })),
        tipoCorrida: config.tipo as TipoCorrida,
        unidadeClienteId: modelo.unidadeClienteId,
        valorDeslocamento: modelo.valorDeslocamento,
        valorDeslocamentoRepasse: modelo.valorDeslocamentoRepasse,
        valorHoraParada: modelo.valorHoraParada,
        valorHoraParadaRepasse: modelo.valorHoraParadaRepasse,
        valorPedagio: modelo.valorPedagio,
        valorViagem: modelo.valorViagem,
        valorViagemRepasse: modelo.valorViagemRepasse,
      };
      console.dir(voucherData, { depth: null, colors: true });
    }
  }

  console.log("Terminou aqui");
  return modelosParaHoje;
}
