import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Aponta para a pasta onde seus arquivos .md vão ficar
const noticiasDirectory = path.join(process.cwd(), 'content/noticias');

export interface NoticiaResumo {
  slug: string;
  title: string;
  resume: string;
  date: string;
  author: string;
  coverImage: string;
}

export function getTodasNoticias(): NoticiaResumo[] {
  // VERIFICAÇÃO DE SEGURANÇA: Se a pasta não existir, retorna uma lista vazia e não quebra o site
  if (!fs.existsSync(noticiasDirectory)) {
    console.warn("Aviso: A pasta content/noticias não foi encontrada. Crie a pasta na raiz do projeto.");
    return [];
  }

  // Lê todos os arquivos da pasta
  const fileNames = fs.readdirSync(noticiasDirectory);
  
  // Filtra para garantir que só vai ler arquivos terminados em .md (ignora arquivos ocultos do Mac como .DS_Store)
  const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

  const todasNoticias = mdFiles.map((fileName) => {
    // Remove o ".md" do nome do arquivo para criar a URL (slug)
    const slug = fileName.replace(/\.md$/, '');

    // Lê o conteúdo do arquivo
    const fullPath = path.join(noticiasDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // O gray-matter separa o Frontmatter (cabeçalho) do conteúdo real
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Sem título',
      resume: data.resume || '',
      date: data.date || 'Data não informada',
      author: data.author || 'Equipe',
      coverImage: data.coverImage || 'https://via.placeholder.com/600x400?text=Sem+Imagem',
    };
  });

  // Ordena pela data mais recente
  return todasNoticias.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNoticiaBySlug(slug: string) {
  const fullPath = path.join(noticiasDirectory, `${slug}.md`);
  
  // Se o usuário digitar uma URL de uma notícia que não existe, retorna nulo
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // O matter devolve 'data' (o cabeçalho) e 'content' (o texto real em markdown)
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Sem título',
    resume: data.resume || '',
    date: data.date || 'Data não informada',
    author: data.author || 'Equipe',
    coverImage: data.coverImage || 'https://via.placeholder.com/600x400?text=Sem+Imagem',
    content, // O texto do artigo!
  };
}