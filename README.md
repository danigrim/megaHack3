# MegaHack 3: Equipe 25

----
## Desafio escolhido: Árvore Educação
veja [Árvore Educação](https://arvoreeducacao.com.br/)

> Objetivo 2: engajar os leitores a lerem mais.

![Árvore Educação Logo](https://www.bettbrasileducar.com/__resource/companyProfiles/16E232D3-93AB-A166-C5B3E5277F67763D-logo.png)

----
## Nossa solução: SeedBook
Montamos uma **rede social** para alunos. Lá fazemos um mapeamento do perfil do aluno por meio de cards, através de um modelo de recomendações de leituras. O aluno escolhe quais livros e personagens ele mais gosta e recomendamos quais próximos livros ele deveria ler baseado nas suas escolhas.

<img src="./imagens/imagem1.png" width="768">

Também estimulamos a criação, indicação, compra e venda de livros **feito pelos próprios alunos** e o compartilhamento de trechos dos livros em áudio e de imagens dos desenhos criados no aplicativo. Quanto mais a criança lê e participa das atividades, mais ganha moedas que podem ser trocadas por personagens, cenários e e-books feitos pelos seus colegas.

<img src="./imagens/imagem2.png" width="768">

Também disponibilizamos **Certificados**, para demonstrar o desenvolvimento dos alunos no aplicativo.

<img src="./imagens/imagem3.png" width="768">

## Flow
1. Quando a criança decide “começar” sua jornada, ela é redirecionada a uma tela que contém vários “Cards”. Na nossa base de dados, cada um desses cards foram avaliados e tem um perfil. A criança seleciona os cards que ela mais gosta e chama nossa API que faz uma média do perfil desses cards para calcular o “perfil leitor” da criança.
2. Na próxima tela, vemos o perfil da criança. Aqui chamamos a API para buscar todos os usuários que são da mesma sala de aula da criança. 
3. Na nossa editora, os alunos podem escrever uma história sem restrições, temos também a funcionalidade que permite que a criança desenhe no seu “livro”. 
4. Na nossa curadoria, a lista de palavras disponíveis para o aluno é gerada através de livros selecionados pelo professor. Usamos processamento de linguagem natural para obter as palavras do livro e remover palavras parecidas para aumentar a variação.
5. Por fim, temos a livraria. Na livraria, vamos ter os livros escritos pela criança e seus amigos (que autorizarem a amostra). Na sessão das recomendações, usamos o perfil leitor do usuário calculado com os cards para recomendar livros. Esse sistema é um exemplo de um sistéma de recomendação chamado **“knowledge based recommendation”**: calculamos a distancia euclideana entre o vetor descrevendo as preferências do usuário e as propriedades dos livros para sugerir as melhores combinações! 

----
## Equipe
* [Cleanderson Lobo](https://www.linkedin.com/in/cleandersonlobo/?originalSubdomain=br) - Software
* [Daniel Moura](https://www.linkedin.com/in/daniel-m-araujo/) - Business
* [Daniella Grimberg](https://www.linkedin.com/in/daniella-grimberg-139a9614b/?originalSubdomain=br) - Software
* [Laura Fiuza](https://www.linkedin.com/in/laura-fiuza-ba1077b4/) - Software
* [Sara Margarido](https://www.linkedin.com/in/saramargarido/?originalSubdomain=br) - Design
