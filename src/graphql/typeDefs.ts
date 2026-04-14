import { mergeTypeDefs } from "@graphql-tools/merge";
import gql from "graphql-tag";

// 1. Importar todos os arquivos de types dos seus módulos
import { operadoraTypes } from "../modulos/operadora/operadoras.types";
import { adminUsuarioTypes } from "../modulos/admin_usuario/admin_usuarios.types";
import { motoristaTypes } from "../modulos/motorista/motoristas.types";
import { empresaClienteTypes } from "../modulos/empresa_cliente/empresas_cliente.type";
import { unidadeEmpresaClienteTypes } from "../modulos/unidade_empresa_cliente/unidade_empresa_cliente.types";
import { relacaoAgrdFuncTypes } from "../modulos/relacao_agrd_func/relacao_agrd_func.types";
import { solicitanteTypes } from "../modulos/solicitante/solicitante.typedefs";
import { centroCustoTypes } from "../modulos/centro_custo/centro_custo.types";
import { carroTypes } from "../modulos/carro/carro.types";
import { modeloVoucherFixoTypes } from "../modulos/modelo_fixo/modelo_fixo.types";
import { modeloRotaTypes } from "../modulos/rota/rota.types";
import { rotaValorTypes } from "../modulos/rota_valor/rota_valor.type";
import { voucherTypes } from "../modulos/voucher/voucher.type";
import { pedagioTypes } from "../modulos/pedagio/pedagio.types";
import { passageirosTypes } from "../modulos/passageiros/passageiros.types";
import { modeloVoucherTurnoTypes } from "../modulos/modelo_turno/modelo_turno.types";
import { voucherPassageiroTypes } from "../modulos/voucher_passageiro/voucher_passageiro.types";
import { moduloFinanceiroTypes } from "../modulos/financeiro/financeiro.types";
import { lancamentoTypes } from "../modulos/lancamentos/lancamento.types";
// 2. Criar um typeDef base.
// Essencial para que os "extend type Query" e "extend type Mutation" dos módulos
// tenham um ponto de partida para se acoplar.
const baseTypeDefs = gql`
  scalar DateTime

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

// 3. Colocar todos os types em um array
const typeDefsArray = [
  baseTypeDefs,
  operadoraTypes,
  adminUsuarioTypes,
  motoristaTypes,
  empresaClienteTypes,
  unidadeEmpresaClienteTypes,
  relacaoAgrdFuncTypes,
  solicitanteTypes,
  centroCustoTypes,
  carroTypes,
  modeloVoucherFixoTypes,
  modeloVoucherTurnoTypes,
  modeloRotaTypes,
  rotaValorTypes,
  voucherTypes,
  pedagioTypes,
  passageirosTypes,
  voucherPassageiroTypes,
  moduloFinanceiroTypes,
  lancamentoTypes,
];

// 4. Exportar o resultado do merge
export const typeDefs = mergeTypeDefs(typeDefsArray);
