const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const prices = {
  milk: { price: 3.97, discountQuantity: 2, discountPrice: 5, discount: 2.94 },
  bread: { price: 2.17, discountQuantity: 3, discountPrice: 6, discount: 0.51 },
  banana: { price: 0.99, discountQuantity: null, discountPrice: null, discount: 0 },
  apple: { price: 0.89, discountQuantity: null, discountPrice: null, discount: 0 },
}

readline.question('Please enter all the items purchased separated by a comma: ', list => {
  const items = list.split(',').map(item => item.trim());
  console.log(items);

  const countedItems = items.reduce((acc, item) => {
    acc[item] ? acc[item]++ : acc[item] = 1;
    return acc;
  }, {})
  console.log(countedItems);


  readline.close()
})
