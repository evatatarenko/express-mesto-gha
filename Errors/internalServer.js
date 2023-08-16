class InternalServer extends Error {
  constructor(message) {
    super(message);
    this.type = 500;
  }
}

module.exports = InternalServer;
