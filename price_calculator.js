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
    if (PRICES[item] && PRICES[item].discountQuantity) {
      const { discount, discountQuantity } = PRICES[item];
      return { item, count, ...rest, discount: Math.floor(count/discountQuantity) * discount }
    }
    return { item, count, ...rest, discount: 0 }
  })
}

const calculateCost = (items) => {
  return items.map(({ item, count, ...rest }) => {
    if (PRICES[item]) {
      return { item, count, ...rest, cost: (PRICES[item].price * count) };
    }
    return { item, count, ...rest, cost: 0 };
  })
}

const applyDiscount = (items) => {
  return items.map(item => {
    if (Number(item.cost) && Number(item.discount)) {
      item.cost = item.cost - item.discount;
    }
    return item;
  });
}

const calculateTotals = (items) => {
  let total = 0;
  let totalSaved = 0;
  for (item of items) {
    let { cost, discount } = item;
    total += cost;
    totalSaved += discount;
  }
  return { items, total, totalSaved };
}


const formatReceipt = ({ items, total, totalSaved }) => {
  console.log(`\nItem     Quantity      Price`)
  console.log(`--------------------------------------`);
  for (item of items) {
    let { item: name, count, cost } = item;
    console.log(`${name.padEnd(9)}${String(count).padEnd(14)}$${cost}`);
  }
  console.log(`\nTotal price : $${total}`)
  console.log(`You saved $${totalSaved} today.`)
}

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const buildReceipt = compose(calculateTotals, applyDiscount, calculateDiscount, calculateCost, countItems);

readline.question('Please enter all the items purchased separated by a comma:\n', list => {
  const receipt = buildReceipt(list);
  formatReceipt(receipt);

  readline.close()
});
