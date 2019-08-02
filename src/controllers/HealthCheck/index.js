class HealthCheckController {
  constructor(router) {
    this.router = router;
    this.router.get('/', this.info);
    this.router.get('healthcheck', this.health);
  }

  info(req, res) {
    res.json({
      status: 'UP',
    });
  }

  health(req, res) {
    res.json({
      status: 'UP',
    });
  }
}

module.exports = HealthCheckController;
