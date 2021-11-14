'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface VideoSceneAttributes {

  name: string;
  thumbnail: string;
  video_url: string;
  template_id: number;
  postion: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class VideoScene extends Model<VideoSceneAttributes>
  implements VideoSceneAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     
  name!: string;
  thumbnail!: string;
  video_url!: string;
  template_id!: number;
  postion!: string;
    static associate(models:any) {
      // define association here
    //   VideoScene.belongsToMany(models.Project, {
    //     through:'ProjectAssignments'
    //   })
    }
  };
  VideoScene.init({
    
    name: {
      type:DataTypes.STRING,
      allowNull: false
  },
  thumbnail:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  video_url:{
    type:DataTypes.STRING
  }
  ,
  template_id:{
    type:DataTypes.INTEGER
  },
  postion:{
    type:DataTypes.TEXT
  },
  
  }, {
    sequelize,
    modelName: 'VideoScene',
  });
  return VideoScene;
};