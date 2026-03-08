import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import cors from "cors";
import cron from "node-cron";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

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

  function tarefaAutomatizada() {
    console.log("---------------------");
    console.log("Executando tarefa de limpeza...");
    console.log(new Date().toLocaleTimeString());
    // A tua lógica real de vouchers ou limpeza entra aqui
  }

  app.get("/cron", (req, res) => {
    console.log("Executando Cron",new Date().toLocaleTimeString())
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
