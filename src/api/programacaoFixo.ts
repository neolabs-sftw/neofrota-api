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
    console.log(`Processando modelo: ${modelo.nomeModelo}`);

    for (const config of modelo.configuracoes) {
      try {
        const horarioLimpo = config.horario.trim();
        const [hora, minuto] = horarioLimpo.split(":");

        // 2. Cria a data atual e injeta a hora do banco
        const dataProgramada = new Date();
        dataProgramada.setHours(Number(hora), Number(minuto), 0, 0);

        const offsetMinutos = dataProgramada.getTimezoneOffset();
        dataProgramada.setMinutes(dataProgramada.getMinutes() - offsetMinutos);

        console.log(dataProgramada);
        // Usa o prisma.voucher.create diretamente aqui
        const novoVoucher = await prisma.voucher.create({
          data: {
            adminUsuarioId: modelo.adminUsuarioId,
            carroId: config.carroId,
            dataHoraProgramado: dataProgramada.toISOString(),
            destino: config.destino,
            empresaClienteId: modelo.empresaClienteId,
            modeloFixoId: modelo.id,
            motoristaId: config.motoristaId,
            natureza: "Fixo",
            operadoraId: modelo.operadoraId,
            origem: config.origem,
            tipoCorrida: config.tipo as TipoCorrida,
            unidadeClienteId: modelo.unidadeClienteId,
            valorDeslocamento: modelo.valorDeslocamento,
            valorDeslocamentoRepasse: modelo.valorDeslocamentoRepasse,
            valorHoraParada: modelo.valorHoraParada,
            valorHoraParadaRepasse: modelo.valorHoraParadaRepasse,
            valorPedagio: modelo.valorPedagio ? modelo.valorPedagio : null,
            valorViagem: modelo.valorViagem,
            valorViagemRepasse: modelo.valorViagemRepasse,

            // ATENÇÃO: Seu resolver exigia um "solicitanteId".
            // Como não tem no seu objeto original, estou usando adminUsuarioId como fallback.
            // Altere se houver uma regra de negócio diferente!
            solicitanteId: modelo.adminUsuarioId,

            // Estrutura correta do Prisma para criar relacionamentos simultaneamente
            passageiros: {
              create: modelo.passageirosFixos.map((passageiro) => ({
                passageiroId: passageiro.passageiroId,
                statusPresenca: "Agendado", // Definindo status inicial padrão
              })),
            },
          },
        });

        console.log(`✅ Voucher gerado com sucesso! ID: ${novoVoucher.id}`);
      } catch (error) {
        // Envolver em try/catch é crucial num loop. Se UM voucher der erro (ex: falta de dado),
        // o loop continua e não quebra a geração dos outros.
        console.error(
          `❌ Erro ao gerar voucher para config ID ${config.id} do modelo ${modelo.nomeModelo}:`,
          error,
        );
      }
    }
  }

  console.log("Terminou a geração de Vouchers");
  return modelosParaHoje;
}
