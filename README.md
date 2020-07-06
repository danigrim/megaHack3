# MegaHack 3: Equipe 25

----
## Desafio escolhido: Árvore Educação
veja [Árvore Educação](https://arvoreeducacao.com.br/)

> Objetivo 2: engajar os leitores a lerem mais.

![Árvore Educação Logo](https://www.bettbrasileducar.com/__resource/companyProfiles/16E232D3-93AB-A166-C5B3E5277F67763D-logo.png)

----
## Nossa solução: SeedBook (Repositório backend)
Montamos uma **rede social** para alunos que incentiva leitura. No primeiro passo, fazemos um mapeamento do perfil leitor do aluno por meio de cards. Cada um desses cards tem um "perfil" na nossa base de dados, que é um vetor de cinco dimensões enumeradas de 0-5 mapeando características como a personalidade dos personagens, atmosféra e clima. Quando o aluno escolhe os cards que ele mais gosta, calculamos uma média desses cards para representar o perfil leitor do aluno. No futuro, se o aluno voltar para esse passo vamos re-calcular uma média dos cards accumulados dele. Esse perfil leitor é usado para recomendarmos livros para o aluno. Quando o aluno acessa a pagina de livros, pegamos todos os livros na nossa base que são apropriados para a facha etária dele, e calculamos as "distâncias euclideanas" entre o perfil do aluno e o perfil do livro, gerando uma lista de recomendações. Assim, podemos recomendar livros parecidos aos jogos, filmes, e séries preferidos do aluno. 

![Imagem 1](./imagens/imagem1.png)

Também estimulamos a criação, indicação, compra e venda de livros **feito pelos próprios alunos** e o compartilhamento de trechos dos livros em áudio e de imagens dos desenhos criados no aplicativo. Quanto mais a criança lê e participa das atividades, mais ganha moedas que podem ser trocadas por personagens, cenários e e-books feitos pelos seus colegas. Na sessão de curadoria, a criança cria histórias usando palavras relacionadas aos livros selecionados pelo professor. Usamos funções de Processamento de Linguagem Natural para extrair palavras de textos e remover palavras similares/identicas. Assim, o aluno interage mais com os livros recomendados pelo professor, ganhando familiaridade com o vocabulário, personagens e cenários dele. 

![Imagem 2](./imagens/imagem2.png)

Também disponibilizamos **Certificados**, para demonstrar o desenvolvimento dos alunos no aplicativo.

![Imagem 3](./imagens/imagem3.png)

----
## Equipe
* [Cleanderson Lobo](https://www.linkedin.com/in/cleandersonlobo/?originalSubdomain=br) - Software
* [Daniel Moura](https://www.linkedin.com/in/daniel-m-araujo/) - Business
* [Daniella Grimberg](https://www.linkedin.com/in/daniella-grimberg-139a9614b/?originalSubdomain=br) - Software
* [Laura Fiuza](https://www.linkedin.com/in/laura-fiuza-ba1077b4/) - Software
* [Sara Margarido](https://www.linkedin.com/in/saramargarido/?originalSubdomain=br) - Design
