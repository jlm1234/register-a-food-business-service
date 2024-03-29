jest.mock("../config", () => ({
  FRONT_END_NAME: "name",
  FRONT_END_SECRET: "secret",
  ADMIN_NAME: "admin",
  ADMIN_SECRET: "admin secret"
}));
jest.mock("../../src/services/statusEmitter.service");
const {
  createRegistrationAuth,
  viewDeleteRegistrationAuth
} = require("./authHandler");
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Middleware: createRegistrationAuth", () => {
  describe("When given a valid name and secret", () => {
    const req = {
      headers: {
        "client-name": "name",
        "api-secret": "secret"
      }
    };
    const res = "res";

    it("Should call the next() function", () => {
      createRegistrationAuth(req, res, next);
      expect(next).toBeCalled();
    });
  });

  describe("When not given a secret", () => {
    const req = {
      headers: {
        "client-name": "name"
      }
    };
    const res = "res";

    it("Should call throw clientSecretNotFound error", () => {
      try {
        createRegistrationAuth(req, res, next);
      } catch (err) {
        expect(err.name).toBe("clientSecretNotFound");
      }
    });
  });

  describe("When not given a client", () => {
    const req = {
      headers: {
        "api-secret": "secret"
      }
    };
    const res = "res";

    it("Should call throw clientNotFound error", () => {
      try {
        createRegistrationAuth(req, res, next);
      } catch (err) {
        expect(err.name).toBe("clientNotFound");
      }
    });
  });

  describe("When given an un supported client", () => {
    const req = {
      headers: {
        "api-secret": "secret",
        "client-name": "badName"
      }
    };
    const res = "res";

    it("Should call throw clientNotSupported error", () => {
      try {
        createRegistrationAuth(req, res, next);
      } catch (err) {
        expect(err.name).toBe("clientNotSupported");
      }
    });
  });

  describe("When given an invalid secret", () => {
    const req = {
      headers: {
        "api-secret": "badSecret",
        "client-name": "name"
      }
    };
    const res = "res";

    it("Should call throw secretInvalid error", () => {
      try {
        createRegistrationAuth(req, res, next);
      } catch (err) {
        expect(err.name).toBe("secretInvalid");
      }
    });
  });
});

describe("Middleware: viewDeleteRegistrationAuth", () => {
  describe("When given a valid name and secret", () => {
    const req = {
      headers: {
        "client-name": "admin",
        "api-secret": "admin secret"
      }
    };
    const res = "res";

    it("Should call the next() function", () => {
      viewDeleteRegistrationAuth(req, res, next);
      expect(next).toBeCalled();
    });
  });

  describe("When not given a secret", () => {
    const req = {
      headers: {
        "client-name": "name"
      }
    };
    const res = "res";

    it("Should call throw clientSecretNotFound error", () => {
      try {
        viewDeleteRegistrationAuth(req, res, next);
      } catch (err) {
        expect(err.name).toBe("clientSecretNotFound");
      }
    });
  });

  describe("When not given a client", () => {
    const req = {
      headers: {
        "api-secret": "secret"
      }
    };
    const res = "res";

    it("Should call throw clientNotFound error", () => {
      try {
        viewDeleteRegistrationAuth(req, res, next);
      } catch (err) {
        expect(err.name).toBe("clientNotFound");
      }
    });
  });

  describe("When given an un supported client", () => {
    const req = {
      headers: {
        "api-secret": "admin secret",
        "client-name": "badName"
      }
    };
    const res = "res";

    it("Should call throw clientNotSupported error", () => {
      try {
        viewDeleteRegistrationAuth(req, res, next);
      } catch (err) {
        expect(err.name).toBe("clientNotSupported");
      }
    });
  });

  describe("When given an invalid secret", () => {
    const req = {
      headers: {
        "api-secret": "badSecret",
        "client-name": "admin"
      }
    };
    const res = "res";

    it("Should call throw secretInvalid error", () => {
      try {
        viewDeleteRegistrationAuth(req, res, next);
      } catch (err) {
        expect(err.name).toBe("secretInvalid");
      }
    });
  });
});
