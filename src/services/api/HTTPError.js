class HTTPError {
  constructor(name, message, context) {
    this.message = message;
    this.isHTTPError = true;
    this.name = name;
    this.context = context;
  }
}

export default HTTPError;
