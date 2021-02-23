const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const PRICES = {
  milk: { price: 3.97, discountQuantity: 2, discountPrice: 5, discount: 2.94 },
  bread: { price: 2.17, discountQuantity: 3, discountPrice: 6, discount: 0.51 },
  banana: { price: 0.99, discountQuantity: null, discountPrice: null, discount: 0 },
  apple: { price: 0.89, discountQuantity: null, discountPrice: null, discount: 0 },
}

const countItems = (groceryString) => {
  const items = groceryString.split(',').map(item => item.trim());

  return Object.entries(items.reduce((acc, item) => {
    acc[item] ? acc[item]++ : acc[item] = 1;
    return acc;
  }, {})).map(([item, count]) => ({ item, count }))
};

const calculateDiscount = (items) => {
  return items.map(({ item, count, ...rest }) => {
    const { discount, discountQuantity } = PRICES[item];
    if (discountQuantity) {
      return { item, count, ...rest, discount: Math.floor(count/discountQuantity) * discount }
    }
    return { item, count, ...rest, discount: 0 }
  })
}

const calculateCost = (items) => {
  return items.map(({ item, count }) => {
    return { item, count, cost: (PRICES[item].price * count) };
  })
}

const applyDiscount = (items) => {
  return items.map(item => {
    item.cost = item.cost - item.discount;
    return item;
  });
}

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const buildReceipt = compose(applyDiscount, calculateDiscount, calculateCost, countItems);

const formatText = (items) => {
  let total = 0;
  let totalSaved = 0;
  console.log(`Item     Quantity      Price`)
  console.log(`--------------------------------------`);
  for (item of items) {
    let { item: name, count, cost, discount } = item;
    total += cost;
    totalSaved += discount;
    console.log(`${name.padEnd(9)}${String(count).padEnd(14)}$${cost}`);
  }
  console.log(`Total price : $${total}`)
  console.log(`You saved $${totalSaved} today.`)
}

readline.question('Please enter all the items purchased separated by a comma: ', list => {
  const receipt = buildReceipt(list);
  formatText(receipt);

  readline.close()
});
