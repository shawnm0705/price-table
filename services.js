function prepareData() {
  let suppliers = [
    {
      id: 1,
      name: '供应商1'
    },
    {
      id: 2,
      name: '供应商2'
    },
    {
      id: 3,
      name: '供应商3'
    }
  ];
  let medicines = [
    {
      id: 1,
      name: '当归'
    },
    {
      id: 2,
      name: '川芎'
    },
    {
      id: 3,
      name: '川贝'
    }
  ];
  let stocks = {
    1: {
      1: {
        'quantity': 101,
        'buying_price': 1.1
      },
      2: {
        'quantity': 102,
        'buying_price': 1.2
      },
      3: {
        'quantity': 103,
        'buying_price': 1.3
      }
    },
    2: {
      1: {
        'quantity': 201,
        'buying_price': 2.1
      },
      2: {
        'quantity': 202,
        'buying_price': 2.2
      },
      3: {
        'quantity': 203,
        'buying_price': 2.3
      }
    }
  };
  localStorage.setItem('suppliers', JSON.stringify(suppliers));
  localStorage.setItem('medicines', JSON.stringify(medicines));
  localStorage.setItem('stocks', JSON.stringify(stocks));
}

function getSuppliers() {
  return JSON.parse(localStorage.getItem('suppliers'));
}

function getMedicines() {
  return JSON.parse(localStorage.getItem('medicines'));
}

function getStocks(supplierId) {
  let allStocks = JSON.parse(localStorage.getItem('stocks'));
  if (allStocks[supplierId]) {
    return allStocks[supplierId];
  }
  return {};
}
