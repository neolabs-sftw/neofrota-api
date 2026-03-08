/*
  Warnings:

  - The values [Basic] on the enum `FuncaoSolicitante` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FuncaoSolicitante_new" AS ENUM ('Finc', 'Oper', 'Prin');
ALTER TABLE "solicitante" ALTER COLUMN "funcao" TYPE "FuncaoSolicitante_new" USING ("funcao"::text::"FuncaoSolicitante_new");
ALTER TYPE "FuncaoSolicitante" RENAME TO "FuncaoSolicitante_old";
ALTER TYPE "FuncaoSolicitante_new" RENAME TO "FuncaoSolicitante";
DROP TYPE "public"."FuncaoSolicitante_old";
COMMIT;
