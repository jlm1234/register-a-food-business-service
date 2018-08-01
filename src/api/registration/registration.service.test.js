jest.mock("../../connectors/registrationDb/registrationDb", () => ({
  createActivities: jest.fn(),
  createEstablishment: jest.fn(),
  createMetadata: jest.fn(),
  createOperator: jest.fn(),
  createPremise: jest.fn(),
  createRegistration: jest.fn(),
  getRegistrationById: jest.fn(),
  getEstablishmentByRegId: jest.fn(),
  getMetadataByRegId: jest.fn(),
  getOperatorByEstablishmentId: jest.fn(),
  getPremiseByEstablishmentId: jest.fn(),
  getActivitiesByEstablishmentId: jest.fn()
}));

jest.mock("../../connectors/tascomi/tascomi.connector", () => ({
  createFoodBusinessRegistration: jest.fn(),
  createReferenceNumber: jest.fn()
}));

const {
  createFoodBusinessRegistration,
  createReferenceNumber
} = require("../../connectors/tascomi/tascomi.connector");

const {
  createRegistration,
  createEstablishment,
  createOperator,
  createActivities,
  createPremise,
  createMetadata,
  getRegistrationById,
  getEstablishmentByRegId,
  getMetadataByRegId,
  getOperatorByEstablishmentId,
  getPremiseByEstablishmentId,
  getActivitiesByEstablishmentId
} = require("../../connectors/registrationDb/registrationDb");

const {
  saveRegistration,
  getFullRegistrationById,
  sendTascomiRegistration
} = require("./registration.service");

describe("Function: saveRegistration: ", () => {
  let result;
  beforeEach(async () => {
    createRegistration.mockImplementation(() => {
      return { id: "435" };
    });
    createEstablishment.mockImplementation(() => {
      return { id: "225" };
    });
    createOperator.mockImplementation(() => {
      return { id: "123" };
    });
    createActivities.mockImplementation(() => {
      return { id: "562" };
    });
    createPremise.mockImplementation(() => {
      return { id: "495" };
    });
    createMetadata.mockImplementation(() => {
      return { id: "901" };
    });
    result = await saveRegistration({
      establishment: {
        establishment_details: {}
      }
    });
  });

  it("Should return the result of createRegistration", () => {
    expect(result).toEqual({
      regId: "435",
      establishmentId: "225",
      operatorId: "123",
      activitiesId: "562",
      premiseId: "495",
      metadataId: "901"
    });
  });
});

describe("Function: getFullRegistrationById: ", () => {
  let result;

  beforeEach(async () => {
    getRegistrationById.mockImplementation(() => {
      return { id: "1" };
    });
    getEstablishmentByRegId.mockImplementation(() => {
      return { id: "1" };
    });
    getMetadataByRegId.mockImplementation(() => {
      return "metadata";
    });
    getOperatorByEstablishmentId.mockImplementation(() => {
      return "operator";
    });
    getPremiseByEstablishmentId.mockImplementation(() => {
      return "premise";
    });
    getActivitiesByEstablishmentId.mockImplementation(() => {
      return "activities";
    });

    result = await getFullRegistrationById();
  });

  it("Should return the result of the get functions", () => {
    expect(result).toEqual({
      registration: { id: "1" },
      establishment: { id: "1" },
      operator: "operator",
      activities: "activities",
      premise: "premise",
      metadata: "metadata"
    });
  });
});

describe("Function: sendTascomiRegistration: ", () => {
  let result;

  beforeEach(async () => {
    jest.clearAllMocks();
    createFoodBusinessRegistration.mockImplementation(() => '{ "id": "123"}');

    createReferenceNumber.mockImplementation(() => "0000123");
    result = await sendTascomiRegistration();
  });

  it("should call createFoodBusinessRegistration", () => {
    expect(createFoodBusinessRegistration).toBeCalled();
  });

  it("should call createReferenceNumber with result of previous call", () => {
    expect(createReferenceNumber).toBeCalledWith("123");
  });

  it("should return response of createReferenceNumber", () => {
    expect(result).toBe("0000123");
  });
});
