'use strict';
//const bookRecommender = require('../services/kid')
var distance = require('euclidean-distance')

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
 */
    makeProfile: async ctx => {
        const { kidId } = ctx.params
        const  cardList  = ctx.request.body.cardlist
        const numCards = cardList.length
        let kidProfile = [0, 0, 0, 0, 0]
        cardList.map(async (id) => {
            const card = await strapi.services.cards.findOne({ _id: id });
            if(card) {
                const cardProfile = card.profile.profile
                cardProfile.forEach((val, i)=>{
                kidProfile[i] = (kidProfile[i]/numCards) + (val/numCards)
            })
            }
        })
        const kid = await strapi.services.kid.update({ kidId }, {profile: {"profile": kidProfile}});
        if(!kid){
            console.log('error in updating kid')
        }
        ctx.send({"updated kid": kidProfile})
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
