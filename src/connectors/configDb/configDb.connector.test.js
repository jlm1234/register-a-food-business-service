jest.mock("mongodb");
jest.mock("./configDb.double");
jest.mock("../../services/statusEmitter.service");

const mongodb = require("mongodb");
const {
  getAllLocalCouncilConfig,
  getConfigVersion,
  clearMongoConnection,
  addDeletedId
} = require("./configDb.connector");
const mockLocalCouncilConfig = require("./mockLocalCouncilConfig.json");
const { lcConfigCollectionDouble } = require("./configDb.double");
const mockConfigVersion = {
  _id: "1.2.0",
  notify_template_keys: {
    fbo_submission_complete: "123",
    lc_new_registration: "456"
  },
  path: {
    "/index": {
      on: true,
      switches: {}
    }
  }
};

let result;

describe("Function: getConfigVersion", () => {
  describe("given the request is successful", () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = false;
      clearMongoConnection();
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: jest.fn(() => mockConfigVersion)
          })
        })
      }));
      result = await getConfigVersion("1.2.0");
    });

    it("should return the configVersion data for this version", () => {
      expect(result).toEqual(mockConfigVersion);
    });
  });
  describe("given the request throws an error", () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = false;
      clearMongoConnection();
      mongodb.MongoClient.connect.mockImplementation(() => {
        throw new Error("example mongo error");
      });

      try {
        result = await getConfigVersion("1.2.0");
      } catch (err) {
        result = err;
      }
    });

    it("should throw mongoConnectionError error", () => {
      expect(result.name).toBe("mongoConnectionError");
      expect(result.message).toBe("example mongo error");
    });
  });
});

describe("Function: getLocalCouncilDetails", () => {
  describe("given the request throws an error", () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = false;
      clearMongoConnection();
      mongodb.MongoClient.connect.mockImplementation(() => {
        throw new Error("example mongo error");
      });

      try {
        await getAllLocalCouncilConfig();
      } catch (err) {
        result = err;
      }
    });

    describe("when the error shows that the connection has failed", () => {
      it("should throw mongoConnectionError error", () => {
        expect(result.name).toBe("mongoConnectionError");
        expect(result.message).toBe("example mongo error");
      });
    });
  });

  describe("given the request is successful", () => {
    beforeEach(() => {
      process.env.DOUBLE_MODE = false;
      clearMongoConnection();
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => ({ toArray: () => mockLocalCouncilConfig })
          })
        })
      }));
    });

    it("should return the data from the find() response", async () => {
      await expect(getAllLocalCouncilConfig()).resolves.toEqual(
        mockLocalCouncilConfig
      );
    });
  });

  describe("when running in double mode", () => {
    beforeEach(() => {
      process.env.DOUBLE_MODE = true;
      clearMongoConnection();
      lcConfigCollectionDouble.find.mockImplementation(() => ({
        toArray: () => mockLocalCouncilConfig
      }));
    });

    it("should resolve with the data from the double's find() response", async () => {
      await expect(getAllLocalCouncilConfig("hi")).resolves.toEqual(
        mockLocalCouncilConfig
      );
    });
  });

  describe("given the request is run more than once during this process (populated cache)", () => {
    beforeEach(() => {
      process.env.DOUBLE_MODE = false;
      clearMongoConnection();
      mongodb.MongoClient.connect.mockClear();
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => ({ toArray: () => mockLocalCouncilConfig })
          })
        })
      }));
    });

    it("returns the correct value", async () => {
      // clear the cache
      clearMongoConnection();

      // run one request
      await expect(getAllLocalCouncilConfig()).resolves.toEqual(
        mockLocalCouncilConfig
      );

      // run a second request without clearing the cache
      await expect(getAllLocalCouncilConfig()).resolves.toEqual(
        mockLocalCouncilConfig
      );
    });

    it("does not call the mongo connection function on the second function call", async () => {
      // clear the cache
      clearMongoConnection();

      // run one request
      await getAllLocalCouncilConfig();
      expect(mongodb.MongoClient.connect).toHaveBeenCalledTimes(1);

      // run a second request without clearing the cache
      await getAllLocalCouncilConfig();
      expect(mongodb.MongoClient.connect).toHaveBeenCalledTimes(1);
    });
  });

  describe("given two requests without clearing the mongo connection", () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = false;
      jest.clearAllMocks();
      clearMongoConnection();
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => ({ toArray: () => mockLocalCouncilConfig })
          })
        })
      }));
    });

    it("should have called the connect function only once", async () => {
      await getAllLocalCouncilConfig();
      await getAllLocalCouncilConfig();

      expect(mongodb.MongoClient.connect).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Function: addDeletedId", () => {
  let response;

  beforeEach(async () => {
    process.env.DOUBLE_MODE = false;
    clearMongoConnection();
    mongodb.MongoClient.connect.mockImplementation(() => ({
      db: () => ({
        collection: () => ({
          insertOne: jest.fn(() => "inserted")
        })
      })
    }));

    response = await addDeletedId();
  });

  it("should return the response from the insertOne()", async () => {
    expect(response).toBe("inserted");
  });
});
