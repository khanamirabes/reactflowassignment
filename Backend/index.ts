import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import {users} from './seeders/users';
import {projects} from './seeders/projects';
import {projectassignments} from './seeders/projectassignments';

const createUsers = ()=>{
    users.map(user=>{
        db.User.create(user)
    })
}
createUsers();

// const createProjectAssignments = ()=>{
//     projectassignments.map(projectassignment=>{
//         db.ProjectAssignment.create(projectassignment)
//     })
// }
// createProjectAssignments();


db.sequelize.sync().then(() =>{
    app.listen(port, ()=>{
        console.log(`app listening on port ${port}`)
    })
})