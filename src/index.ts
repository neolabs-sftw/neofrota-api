import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import cors from "cors";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { executarCriacaoVoucher } from "./api/voucher.service";
import { ProgramacaoDia } from "./api/programacaoFixo";

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: [
        "http://localhost:5173",
        "https://app.neofrota.com.br",
        "https://neofrota.com.br",
      ],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { req };
      },
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/ping", (req, res) => {
    res.status(200).send("pong");
  });

  app.get("/programacao", async (req, res) => {
    try {
      const resultado = await ProgramacaoDia();
      res
        .status(200)
        .json({
          mensagem: "Lista de Vouchers gerada com sucesso",
          dados: resultado,
        });
    } catch (error) {
      console.error("Erro na rota /programacao:", error);
      res
        .status(500)
        .json({
          mensagem: "Erro crítico ao gerar programação. Nenhum voucher salvo.",
        });
    }
  });

  await new Promise<any>((resolve) => {
    const httpServer = app.listen({ port: 4000 }, () => {
      console.log(`Server ready at http://localhost:4000/graphql`);
    });
    resolve({ server: httpServer });
  });
}

startServer().catch((err) => {
  console.error("Erro ao iniciar o servidor:", err);
});
