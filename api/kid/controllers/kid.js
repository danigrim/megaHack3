'use strict';
var distance = require('euclidean-distance')
var natural = require('natural');

module.exports = {

    /**
     * Endpoint retorna uma lista ordendada de recomendações de livros
     * Livros filtrados por idade apropriada e rankeados baseados na distancia euclediana entre
     * o vetor de cinco dimensões que define o perfil leitor do usuario e o perfil do livro.  
     * @returns lista ordenada de livros com título e id. 
     */
  recommendBooks: async ctx => {
    const { kidId } = ctx.params
    try{
    const kid = await strapi.services.kid.findOne({ kidId });
    const profile = kid.profile
    const kidAge = kid.ageRange
    if(kidAge && profile && profile.profile){
    const books = await strapi.query('book').find({ageRange: kidAge})
    let recs = {}
    const rank = []
    books.forEach((book)=> {
      let d = distance(profile.profile, book.profile.profile)
      recs[d] = recs[d] ? recs[d].push({title: book.title, id: book._id}) : recs[d] = [{title: book.title, id: book._id}]
    })
     Object.keys(recs).sort().map((dist, i) => {
        rank[i] = recs[dist]
    })
    ctx.send({"ranking": rank})
    }else {
        ctx.send({Error:"Faltando informação sobre a criança"})
    }
    }  catch (e) {
       ctx.send('error')
    }
},

/**
 * Enpoint gera o vetor de cinco dimensões que define o perfil leitor do usuário baseado em uma média
 * do perfil dos cards selecionados pelo usuário.
 * @Params KidId - id do usuario, cardList - lista de Ids das cartas selecionadas pelo usuário
 * @returns vetor definindo perfil do usuário [a, b, c, d, e]
 */
    makeProfile: async ctx => {
        try{
        const { kidId } = ctx.params
        const  cardList  = ctx.request.body.cardlist
        const kid = await strapi.services.kid.findOne({kidId})
        if(!kid){
            ctx.send({Error: "Essa criança não existe"})
        }
        //Se o usuário já passou por user profiling, começar a partir de valores anteriores, se não, um vetor neutro é inicializado para o usuário
        let kidProfile = (kid.profile && kid.profile.profile) ? kid.profile.profile: [0, 0, 0, 0, 0]
        const profileInstances = (Number(kid.numProfilings) > 0) ? (Number(kid.numProfilings) + cardList.length) : cardList.length
        console.log('instances before', profileInstances)
        const cardPromises = cardList.map(async (id, n) => {
            const card = await strapi.services.cards.findOne({ _id: id });
            if(card) {
                const cardProfile = card.profile.profile
                cardProfile.forEach((val, i)=>{
                const profiles_read = profileInstances - (cardList.length - n -1)
                const prev_val = kid.numProfilings ? Number(kidProfile[i])*(profiles_read-1) : 0
                const val_sum = prev_val + val
                kidProfile[i] = (profiles_read) !== 0 ? (val_sum/profiles_read): 0
            })
            }
        })
        await Promise.all(cardPromises)
        const profileInstancesUpdate = await strapi.services.kid.update({ kidId }, {numProfilings: profileInstances.toString()});
        const profileUpdate = await strapi.services.kid.update({ kidId }, {profile: {"profile": kidProfile}});
        if(!(profileInstancesUpdate && profileUpdate)){
            ctx.send({Error: "Não foi possível atualizar o perfil da criança"})
        }
        ctx.send({"perfil Leitor calculado com sucesso!": kidProfile})
    }catch(error){
        ctx.send({error: error.message})
    }
    },

    /**
     * Endpoint recebe id de aluno, gera lista de palavras baseadas nos livros selecionados pelo professor
     * em seu portal professor. A lista é reduzinda para remover palavras parecidas/identicas.
     * Remove todas as palavras com similaridade acima do nível 0.9 (como definido pelo padrão de JaronWinklerDistance)
     * @returns lista de palavras
     */
    getWords: async ctx => {
        try{
      const { kidId } = ctx.params
      const kid = await strapi.services.kid.findOne({kidId})
      if(!kid){
        ctx.send('Essa criança não existe')
      }
      const bookIds = kid.class.books
      let wordList = []
      var tokenizer = new natural.AggressiveTokenizerPt();
      const bookPromises = bookIds.map(async (id)=> {
          const book = await strapi.query('book').findOne({_id: id})
          if (!book){
              ctx.send({Error: 'Livro não existe'})
          }
            wordList = wordList.concat(tokenizer.tokenize(book.blurb))
      })
      await Promise.all(bookPromises)
      const reducedList = wordList.filter((word1, i) => {
        let unique = true
        for(var w = i+1; w<wordList.length; w++){
          var first_word = word1.toLowerCase()
          var second_word = wordList[w].toLowerCase()
          let wordProximity = natural.JaroWinklerDistance(first_word, second_word)
          if(wordProximity > 0.90){
            unique = false
            break;
          }
        }
        return unique
     })
      ctx.send({palavras: reducedList})
    } catch(error) {
            ctx.send({"error" :error.message})
    }
    },
    /**
     * Endpoint atualizando estado do usuario após compra.
     */
    buyGood: async ctx => {
       try{
       const { kidId } = ctx.params
       const  id  = ctx.request.body.good
       const good = await strapi.query('goods').findOne({_id: id})
       console.log(good)
        if(!good){
            ctx.send('Esse bem não existe')
        }
        const kid = await strapi.services.kid.findOne({kidId})
        console.log(kid)
        if(!kid){
            ctx.send('Essa criança não existe')
        }
        if(good.cost > kid.coins){
          console.log('stuck buying')
          ctx.send('Usuário não tem moedas o suficiente para a compra')
        }
        let new_coins = kid.coins - good.price
        console.log(new_coins)
        const previously_owned = kid.goods_owned ? kid.goods_owned : []
        const kid_goods = [...previously_owned, good._id]
        console.log(kid_goods)
        //kid.goods.push(goos)
       const kidupdated = await strapi.services.kid.update({ kidId }, {goods_owned: kid_goods});
       if(!kidupdate){
        console.log('error in updating kid')
      }
       //Promise.all(coinUpdate, goodUpdate)
       // kid.save()
       ctx.send({"kid": kidupdated})
    } catch(error) {
        ctx.send(error.message)
    }
}
};
