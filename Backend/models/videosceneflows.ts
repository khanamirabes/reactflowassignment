'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface VideoScenesFlowsAttributes {

  template_id: number;
  source: number;
  sourceHandle: string;
  target: number;
  targetHandle: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class VideoScenesFlows extends Model<VideoScenesFlowsAttributes>
  implements VideoScenesFlowsAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     
  template_id!: number;
  source!: number;
  sourceHandle!: string;
  target!: number;
  targetHandle!: string;
    static associate(models:any) {
      // define association here
    //   VideoScenesFlows.belongsToMany(models.Project, {
    //     through:'ProjectAssignments'
    //   })
    }
  };
  VideoScenesFlows.init({
    template_id: {
      type:DataTypes.INTEGER
  },
  source:{
    type:DataTypes.INTEGER,
  },
  sourceHandle:{
    type:DataTypes.TEXT
  }
  ,
  target:{
    type:DataTypes.INTEGER
  },
  targetHandle:{
    type:DataTypes.TEXT
  },
  
  }, {
    sequelize,
    modelName: 'VideoScenesFlows',
  });
  return VideoScenesFlows;
};