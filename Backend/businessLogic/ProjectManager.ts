 import db  from '../models'



export class ProjectManager {

  public static fetch(request:any, response: any){

    db.Project.findAll().then((result:any)=>{
      console.log('this is result',result)
      response.status(200).send("this sihasdhjkakj")
  }).catch((err:any)=>{
      console.log('this is err', err)
  })

}
}