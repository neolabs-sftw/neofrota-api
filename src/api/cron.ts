// src/api/cron.ts
import express, { Request, Response } from 'express';
// Se tiveres um ficheiro de serviço do Prisma, importa-o aqui
// import { prismaService } from '../voucher.service'; 

const cronRouter = express.Router();

// Esta função define a lógica do Cron como uma rota normal do Express
cronRouter.get('/trigger-cron', async (req: Request, res: Response) => {
  console.log("-----------------------------------------");
  console.log("Iniciando Verificação de Vouchers: ", new Date().toISOString());

  // SEGURANÇA: Verifica se a chamada tem o segredo correto
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn("Tentativa de acesso não autorizada ao Cron.");
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    // 1. Lógica do Banco de Dados com Prisma
    // (A mesma lógica que discutimos antes para filtrar e criar vouchers)
    
    // --- LÓGICA SIMPLIFICADA PARA TESTE ---
    const hoje = new Date();
    // Exemplo: Simular que encontramos modelos e criámos vouchers
    console.log(`Verificação concluída para a data: ${hoje.toLocaleDateString()}`);
    // ----------------------------------------

    // Resposta de sucesso para o Express
    return res.status(200).json({ 
      success: true, 
      message: "Cron processado com sucesso!" 
    });

  } catch (error) {
    console.error("Erro no processamento do Cron:", error);
    // Em produção, não queremos expor detalhes do erro
    return res.status(500).json({ error: "Erro interno do servidor durante o cron." });
  } finally {
    console.log("-----------------------------------------");
  }
});

export default cronRouter;