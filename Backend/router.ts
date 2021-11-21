
import * as Managers from './businessLogic';


export class Router {
  private application;

  //Constructor For applicatin
  constructor(app: any) {
    this.application = app;
  }
  public associate() {

    this.application.get('/', function (req: any, res: any) {
      res.status(200).send("This api is for getting data")
    })
    this.application.get('/fetchVedioScenes/:template_id', Managers.VideoSceneManager.fetch)
    this.application.get('/fetchVedioScenesflow/:template_id', Managers.VideoSceneManager.fetchSceneFlow)
    this.application.post('/insert', Managers.VideoSceneManager.addScene)
    this.application.post('/insert/sceneflow', Managers.VideoSceneManager.addSceneflow)
    this.application.put('/videoscenes/position', Managers.VideoSceneManager.updateNodePosition)


  }



}