'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'VideoScenesFlows',
      'textData', {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
          after: 'targetHandle'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('VideoScenesFlows',"textData");
  }
};