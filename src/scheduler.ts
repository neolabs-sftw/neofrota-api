import cron from "node-cron";
import { executarCriacaoVoucher } from "./api/voucher.service";

cron.schedule("*/1 * * * *", async () => {
  console.log("--- Iniciando criação automática de Voucher ---");
  const dadosExemploVoucher = {
    origem: "Sede Central",
    destino: "Filial Norte",
    dataHoraProgramado: new Date(),
    natureza: "Fixo",
    tipoCorrida: "Entrada",
    status: "Aberto",

    // ADICIONA ESTES CAMPOS (e outros que sejam obrigatórios no teu schema)
    valorViagem: 50.0,
    valorViagemRepasse: 40.0,
    valorDeslocamento: 0,
    valorDeslocamentoRepasse: 0,
    valorHoraParada: 0,
    valorHoraParadaRepasse: 0,
    valorPedagio: 0,
    valorEstacionamento: 0,

    // IDs de exemplo (certifica-te que estes IDs existem no teu DB)
    empresaClienteId: "1",
    unidadeClienteId: "1",
    motoristaId: "1",
    solicitanteId: "1",
    adminUsuarioId: "1",
    operadoraId: "1",
    carroId: "1",

    passageiros: [
      { passageiroId: "1", statusPresenca: "Agendado" },
      { passageiroId: "2", statusPresenca: "Agendado" },
      { passageiroId: "3", statusPresenca: "Agendado" },
    ],
  };
  const dadosExemploVoucher2 = {
    origem: "Sede Central",
    destino: "Filial Norte",
    dataHoraProgramado: new Date(),
    natureza: "Extra",
    tipoCorrida: "Saida",
    status: "Aberto",

    // ADICIONA ESTES CAMPOS (e outros que sejam obrigatórios no teu schema)
    valorViagem: 90.0,
    valorViagemRepasse: 70.0,
    valorDeslocamento: 0,
    valorDeslocamentoRepasse: 0,
    valorHoraParada: 0,
    valorHoraParadaRepasse: 0,
    valorPedagio: 0,
    valorEstacionamento: 0,

    // IDs de exemplo (certifica-te que estes IDs existem no teu DB)
    empresaClienteId: "1",
    unidadeClienteId: "1",
    motoristaId: "1",
    solicitanteId: "1",
    adminUsuarioId: "1",
    operadoraId: "1",
    carroId: "1",

    passageiros: [
      { passageiroId: "3", statusPresenca: "Agendado" },
      { passageiroId: "4", statusPresenca: "Agendado" },
      { passageiroId: "5", statusPresenca: "Agendado" },
    ],
  };
  const dadosExemploVoucher3 = {
    origem: "Sede Central",
    destino: "Filial Norte",
    dataHoraProgramado: new Date(),
    natureza: "Turno",
    tipoCorrida: "Entrada",
    status: "Aberto",

    // ADICIONA ESTES CAMPOS (e outros que sejam obrigatórios no teu schema)
    valorViagem: 150.0,
    valorViagemRepasse: 140.0,
    valorDeslocamento: 0,
    valorDeslocamentoRepasse: 0,
    valorHoraParada: 0,
    valorHoraParadaRepasse: 0,
    valorPedagio: 0,
    valorEstacionamento: 0,

    // IDs de exemplo (certifica-te que estes IDs existem no teu DB)
    empresaClienteId: "1",
    unidadeClienteId: "1",
    motoristaId: "1",
    solicitanteId: "1",
    adminUsuarioId: "1",
    operadoraId: "1",
    carroId: "1",

    passageiros: [
      { passageiroId: "6", statusPresenca: "Agendado" },
      { passageiroId: "7", statusPresenca: "Agendado" },
      { passageiroId: "20", statusPresenca: "Agendado" },
    ],
  };

  try {
    const novoVoucher = await executarCriacaoVoucher(dadosExemploVoucher);
    const novoVoucher2 = await executarCriacaoVoucher(dadosExemploVoucher2);
    const novoVoucher3 = await executarCriacaoVoucher(dadosExemploVoucher3);
    console.log(
      `Voucher criado com sucesso! ID: ${novoVoucher.id}, ${novoVoucher2.id}, ${novoVoucher3.id} `,
    );
  } catch (err) {
    console.error("Falha na execução do Cron");
  }
});
