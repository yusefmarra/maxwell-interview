const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const PRICES = {
  milk: { price: 3.97, discountQuantity: 2, discountPrice: 5, discount: 2.94 },
  bread: { price: 2.17, discountQuantity: 2, discountPrice: 6, discount: 0.51 },
  banana: { price: 0.99, discountQuantity: null, discountPrice: null, discount: 0 },
  apple: { price: 0.89, discountQuantity: null, discountPrice: null, discount: 0 },
}

const calculateDiscount = (item, count) => {
  const { discount, discountQuantity } = PRICES[item];
  if (discountQuantity) {
    return Math.floor(count/discountQuantity) * discount
  }
  return 0;
}

const calculateCost = (countedItems) => {
  return countedItems.map(([item, count]) => {
    const discount = calculateDiscount(item, count);
    return { item, count, cost: (PRICES[item].price * count), discount };
  })
}

const applyDiscount = (items) => {
  return items.map(item => {
    item.cost = item.cost - item.discount;
    return item;
  });
}

const formatText = (items) => {
  console.log(items)
  console.log(`Item     Quantity      Price`)
  console.log(`--------------------------------------`);
  for (item of items) {
    console.log(`${item.item}    ${item.count}         ${item.cost}`);
  }
}

readline.question('Please enter all the items purchased separated by a comma: ', list => {
  const items = list.split(',').map(item => item.trim());

  const countedItems = items.reduce((acc, item) => {
    acc[item] ? acc[item]++ : acc[item] = 1;
    return acc;
  }, {})

  const what = applyDiscount(calculateCost(Object.entries(countedItems)));
  console.log(what);

  formatText(what);

  readline.close()
});
