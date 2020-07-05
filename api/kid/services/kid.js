'use strict';

const PDFDocument = require('pdfkit')
const fs = require('fs')
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

 const writeBook = async(b)=> {
    const doc = new PDFDocument({ autoFirstPage: true });
     try{
    doc.pipe(fs.createWriteStream('output.pdf'));
    if(b.title){
    const book_title = b.title
    doc.font('Courier').fill('#000')
    .moveDown(1)
    .fontSize(25)
    .text(book_title)
    .moveDown(3)
    }
    const book_text = b.text
    doc.font('Courier').fill('#000')
        .fontSize(15)
        .text(book_text)
    doc.end()
   // const new_book = await strapi.query('book').create({"name": 'bookkid', "cover":});
    return ({success: "true"})
    }catch(error){
     return({success: "false"})
    }

 }
module.exports = {
    bookPdf: async (b, kid) => {
        try{
        const result = await writeBook(b)
        return result
        }catch (error) {
            return ({success: "false"})
        }
    }
};
