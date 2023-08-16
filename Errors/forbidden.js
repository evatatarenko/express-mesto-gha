class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.type = 403;
  }
}

module.exports = Forbidden;
