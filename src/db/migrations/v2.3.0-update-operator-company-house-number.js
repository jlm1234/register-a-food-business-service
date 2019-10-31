"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      "operators",
      "operator_company_house_number",
      "operator_companies_house_number"
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      "operators",
      "operator_companies_house_number",
      "operator_company_house_number"
    );
  }
};
