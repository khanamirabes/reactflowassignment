import db  from '../models'



export class VideoSceneManager {
  
  public static addScene(request:any, response: any){
      let temp = {
        name: request.body.name,
        thumbnail: request.body.thumbnail,
        video_url: request.body.vedio_url,
        template_id: 1,
        postion: request.body.position
      }
      

    db.VideoScene.create(temp).then((result:any)=>{
      console.log('this is result',result)
      response.status(200).send("this sihasdhjkakj")
  }).catch((err:any)=>{
      console.log('this is err', err)
  })

}

public static addSceneflow(request:any, response: any){
  let temp = { 
  template_id: 1,
  source: request.body.source,
  sourceHandle: request.body.sourceHandle,
  target:  request.body.target,
  targetHandle: request.body.targetHandle
  }
  

db.VideoScenesFlows.create(temp).then((result:any)=>{
  console.log('this is result',result)
  response.status(200).send("this VideoScenesFlows")
}).catch((err:any)=>{
  console.log('this is err', err)
})

}

public static fetchSceneFlow(request:any, response: any){
  const param = request.params
  const template_id = param.template_id;
  db.VideoScenesFlows.findAll({
    where:{template_id:template_id}
  }).then((result:any)=>{
    console.log('this is result',result)
    response.status(200)
    response.json(result)
    return;
}).catch((err:any)=>{
    console.log('this is err', err)
})

}
public static fetch(request:any, response: any){
  const param = request.params
  const template_id = param.template_id;
  db.VideoScene.findAll({
    where:{template_id:template_id}
  }).then((result:any)=>{
    console.log('this is result',result)
    response.status(200)
    response.json(result)
    return;
}).catch((err:any)=>{
    console.log('this is err', err)
})

}
}