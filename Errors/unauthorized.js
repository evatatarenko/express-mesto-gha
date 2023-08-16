class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.type = 401;
  }
}

module.exports = Unauthorized;
