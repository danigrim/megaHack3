'use strict';
//const bookRecommender = require('../services/kid')
var distance = require('euclidean-distance')
var natural = require('natural');

module.exports = {

    /**
     * Função retorna uma lista ordendada de recomendações de livros
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
    const books = await strapi.query('book').find({ageRange: kidAge})
    if(kid.profile.profile == undefined){
        ctx.send({error: 'error finding profile for kid'})
    }
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

    } catch (e) {
       ctx.send('error')
    }
},

/**
 * Função gera o vetor de cinco dimensões que define o perfil leitor do usuário baseado em uma média
 * do perfil dos cards selecionados pelo usuário.
 * @returns use reader profile
 */
    makeProfile: async ctx => {
        const { kidId } = ctx.params
        const  cardList  = ctx.request.body.cardlist
        const kid = await strapi.services.kid.findOne({kidId})
        if(!kid){
            ctx.send('Essa criança não existe')
        }
        let kidProfile = kid.profile.profile? kid.profile.profile: [0, 0, 0, 0, 0]
        let profileInstances = kid.profile.profileInstances ? (kid.profile.profileInstancescardList.length + cardList.length) : cardList.length
        cardList.map(async (id) => {
            const card = await strapi.services.cards.findOne({ _id: id });
            if(card) {
                const cardProfile = card.profile.profile
                cardProfile.forEach((val, i)=>{
                const val_sum = kidProfile[i] + val
                kidProfile[i] = (val_sum) !== 0 ? (val_sum/profileInstances): 0
            })
            }
        })
        const kidupdate = await strapi.services.kid.update({ kidId }, {profile: {"profile": kidProfile}});
        if(!kidupdate){
            console.log('error in updating kid')
        }
        ctx.send({"updated kid": kidProfile})
    },

    /**
     * Função recebe id de aluno, gera lista de palavras baseadas no livro indicado pelo professor
     * reduzindo a lista para remover palavras parecidas/identicas, determinado pelo modelo JaroWinkler
     * que calcula a similaridade entre palavras
     * 
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
              ctx.send('Livro não existe')
          }
            wordList = wordList.concat(tokenizer.tokenize(book.blurb))
      })
      await Promise.all(bookPromises)
      const reducedList = wordList.filter((word1, i) => {
          console.log('in reducer loop')
        let unique = true
        for(var w = i+1; w<wordList.length; w++){
          let wordProximity = natural.JaroWinklerDistance(word1.toLowerCase(), wordList[w].toLowerCase())
          if(wordProximity > 0.85){
            unique = false
            break;
          }
        }
        return unique
     })
      ctx.send({palavras: reducedList})
    } catch(error) {
            ctx.send({"error" :error})
    }
    }


// newFriend: async ctx => {
//     const { kidId } = ctx.params
//     const newFriend = ctx.request.body
//     const kid = await strapi.services.kid.findOne({ kidId });
//     const friends = kid.friendList
//     friends['']
//     ctx.send(friends)
// }


};
