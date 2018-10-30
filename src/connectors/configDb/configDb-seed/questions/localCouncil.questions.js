const lcQuestions = {
  allEnvs: [
    {
      type: "input",
      name: "SEED_LC_NAME",
      message: "Enter the display name for the new local council"
    },
    {
      type: "input",
      name: "SEED_LC_ID",
      message:
        "Enter the four-digit numeric ID/code for the new local council, e.g. 1234"
    },
    {
      type: "input",
      name: "SEED_LC_URL",
      message: "Enter the url string of the new local council, e.g. west-dorset"
    }
  ],
  nonProduction: [
    {
      type: "input",
      name: "SEED_TASCOMI_URL_DEV",
      message:
        "Enter the SANDBOX Tascomi API URL? (DO NOT ENTER A LIVE API URL)"
    },
    {
      type: "input",
      name: "SEED_TASCOMI_PUBLIC_KEY_DEV",
      message: "Enter the SANDBOX Tascomi PUBLIC key"
    },
    {
      type: "input",
      name: "SEED_TASCOMI_PRIVATE_KEY_DEV",
      message: "Enter the SANDBOX Tascomi PRIVATE key"
    }
  ],
  production: [
    {
      type: "input",
      name: "SEED_LC_EMAIL",
      message:
        "Enter the email address that the council wants displayed to users"
    },
    {
      type: "input",
      name: "SEED_LC_NOTIFY_EMAIL",
      message:
        "Enter the email address that the council wants to be notified on"
    },
    {
      type: "input",
      name: "SEED_LC_PHONE_NUMBER",
      message:
        "(OPTIONAL) Enter the phone number that the council wants displayed to users"
    },
    {
      type: "input",
      name: "SEED_TASCOMI_URL_LC",
      message: "Enter the real Tascomi API URL for the new local council"
    },
    {
      type: "input",
      name: "SEED_TASCOMI_PUBLIC_KEY_LC",
      message: "Enter the real Tascomi PUBLIC key for the new local council"
    },
    {
      type: "input",
      name: "SEED_TASCOMI_PRIVATE_KEY_LC",
      message: "Enter the real Tascomi PRIVATE key for the new local council"
    }
  ]
};
module.exports = { lcQuestions };
