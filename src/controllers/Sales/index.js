const boom = require('boom');
const salesRepository = require('../../repositories/sales-repository');

class SalesController {
  constructor(router) {
    this.router = router;
    this.router.get('/sales', this.getAllSales);
    this.router.get('/salesByCompany', this.getSalesByCompany);
    this.router.get('/sales/:id', this.getOneSales);
    this.router.post('/sales', this.storeSales);
  }

  async getAllSales(req, res, next) {
    try {
      const list = await salesRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getSalesByCompany(req, res, next) {
    try {
      const { company } = req.query;
      const list = await salesRepository.byCompany(company);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneSales(req, res, next) {
    try {
      const { id } = req.params;
      const item = await salesRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeSales(req, res, next) {
    try {
      const { body } = req;
      const item = await salesRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = SalesController;
