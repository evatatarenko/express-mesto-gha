class NotFound extends Error {
  constructor(message) {
    super(message);
    this.type = 404;
  }
}

module.exports = NotFound;
