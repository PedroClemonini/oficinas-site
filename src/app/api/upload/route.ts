import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Gera um nome único para evitar que arquivos com o mesmo nome se sobrescrevam
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`; // Limpa caracteres estranhos
    
    // Caminho físico onde o arquivo será salvo (dentro da pasta public)
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filepath = path.join(uploadDir, filename);

    // Garante que a pasta existe antes de salvar
    await mkdir(uploadDir, { recursive: true });
    
    // Salva o arquivo no disco do contêiner
    await writeFile(filepath, buffer);

    // Retorna a URL que o frontend vai usar para exibir a imagem
    const fileUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json({ error: "Erro interno ao processar o arquivo" }, { status: 500 });
  }
}