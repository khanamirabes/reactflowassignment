'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'VideoScenes',
      'postion', {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
          after: 'video_url'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('VideoScenes',"postion");
  }
};