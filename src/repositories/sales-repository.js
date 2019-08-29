const { Op } = require('sequelize');
const { Sales, SalesDetail, Inventory } = require('../database/models');

const all = async () => {
  const list = await Sales.findAll();
  return list;
};

const byCompany = async (company) => {
  const list = await Sales.findAll({
    where: {
      company,
    },
  });
  return list;
};

const one = async (id) => {
  const item = await Sales.findOne({
    where: {
      id,
    },
    include: [
      {
        model: SalesDetail,
      },
    ],
  });
  return item;
};

const store = async (sale) => {
  const newSale = await Sales.create({
    provider: sale.customerId,
    company: sale.company,
    total: sale.total,
    tax: sale.tax,
    discount: sale.discount,
    percentage: sale.percentage,
  });

  const detail = sale.items.map(item => ({
    quantity: item.quantity,
    price: item.price,
    subtotal: item.subtotal,
    productId: item.product,
    salesId: newSale.id,
  }));

  await SalesDetail.bulkCreate(detail);
  const productsIds = sale.items.map(item => item.product);
  const inventoryExist = await Inventory.findAll({
    where: {
      company: sale.company,
      product: {
        [Op.in]: productsIds,
      },
    },
  });

  const promisesForInventory = sale.items.map((item) => {
    const exist = inventoryExist.find(iv => iv.product === item.product);
    if (exist) {
      return Inventory.update({
        stock: parseInt(exist.stock - item.quantity, 10),
      }, { where: { id: exist.id } });
    }

    return Inventory.create({
      product: item.product,
      stock: item.quantity,
      minimun: 0,
      company: sale.company,
    });
  });

  await Promise.all(promisesForInventory);

  const saleWithDetail = await one(newSale.id);

  return saleWithDetail;
};

module.exports = {
  all,
  one,
  byCompany,
  store,
};
