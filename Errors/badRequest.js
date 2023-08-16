class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.type = 400;
  }
}

module.exports = BadRequest;
