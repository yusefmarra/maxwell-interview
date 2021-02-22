const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

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
