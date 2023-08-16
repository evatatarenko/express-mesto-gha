class Conflict extends Error {
  constructor(message) {
    super(message);
    this.type = 409;
  }
}

module.exports = Conflict;
