/*
Programmer: Eric Hepperle
Date: 01/19/23

Print information from price label objects to console


*/

import priceLabels from "./price-labels-auto-parts.js";
import emoji from "node-emoji";

// const ratingUnit = '🚙'
const rating = {
  symbols: {
    bottomSquareLarge: '▄',
    squareSmall: '□',
    squareSmallFilled: '■'
  }
}
  // console.log(emoji.get('pizza'))

function printPrettyJSON() {

  const out = JSON.stringify(priceLabels, null, 4)
  // const out = JSON.stringify(JSON.parse(priceLabels))
  return out.replace(/\\n/g, '')

}


function main() {


  const prettyLabels = printPrettyJSON()

  printPartInfo(priceLabels)

  // console.log(currencyF(27.33, 'kr', false))

}
main()


function printPartInfo(labels) {

  labels.forEach((label, i) => {

    const itemName = label['item-name']
    const brand = label.brand['common-name'] ? label.brand['common-name'] : label.brand['full-name']
    const model = label.model ? label.model : label['part-num']
    const regPrice = label.price
    const salePrice = label.sale.price
    const priceInfo = salePrice ? `${currencyF(salePrice, '$', 'front')} (Was ${currencyF(regPrice, '$', 'front')})` : `${currencyF(regPrice, '$', 'front')}`
    const partNum = label['part-num']
    const sku = label.sku
    const line = label.brand.abbr


    const literal = `
    ==============================

    ${salePrice ? `SALE! ` : ""}${brand} ${itemName} [Model: ${model}]
    Details:
      * Price: ${priceInfo}
      * Rating: ${formatRating(label.rating)}
      * Part #: ${partNum}  Line: ${line}
      * SKU #: ${sku}
    `
    console.log(literal)

  })

}

// f stands for formatted
function currencyF(price, symbol, locFront = true) {

  let formattedPrice = ''

  if (locFront) {
    formattedPrice = `${symbol}${price}`
  } else {
    formattedPrice = `${price} ${symbol}`
  }

  return formattedPrice

}

// ratingNum out of 5
function formatRating(ratingNum) {

  const ratingSym = rating.symbols.squareSmallFilled
  const remainderSym = rating.symbols.squareSmall

  const ratingStr = `${ratingSym} `.repeat(ratingNum)
  const remainderStr = `${remainderSym} `.repeat(5 - ratingNum)

  return `${ratingStr}${remainderStr}`


}




/*

{
    "item-name": "Bed Armor Kit",
    "brand": {
      "full-name": "Dupli-Color",
      "common-name": "Dupli-Color",
      "abbr": "DPL",
    },
    "model": "",
    "part-num": "BAK2010",
    "sku": "D09012020",
    "price": "109.99",
    "currency": {
      "abbr": "USD",
      "symbol": "$",
      "symbol-loc": "front"
    },
    "category": "",
    "unit": {
      "type": "kit",
      "type-abbr": "kit",
      "type-abbr-mult": "kits",
      "unit-qty": "1"
    },
    "fluid": {
      "unit": "fl oz",
      "qty": "128"
    },
    "sale": {
      "thru": "date",
      "price": ""
    }
  }

*/