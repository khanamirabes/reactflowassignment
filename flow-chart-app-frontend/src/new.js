import React, { useState, useEffect } from 'react';
import Axios from 'axios'

import ReactFlow, {addEdge, Background, Controls, MiniMap, removeElements} from 'react-flow-renderer';

//  saving data into local storage coding start
    // useEffect(() => {
    //   setElements(JSON.parse(localStorage.getItem("MyvedioScenes")))
    // }, [])

    // const updateAddScene = (elements) =>{
    //   localStorage.setItem("MyvedioScenes", JSON.stringify(elements))
    //   setElements(elements)
    // }
    

    //  saving data into local storage coding end

    //  now replace setElements by updateAddScene

const initialElements = [

  // { id: '1',type: 'input', data: { label: <div>Node 1</div> }, position: { x: 100, y: 100 } },
  { id: '1', type: 'input', data: { label:
    <div onClick = {()=>alert("You are Welcome to scene 1")}>
       <div className="card" >
            <img className="card-img-top" src="https://picsum.photos/200/300/?blur"  height = '50px' alt="Card-image-cap"/>
               <div className="card-body">
                   <p className="card-text">Starting Scene</p>
               </div>
       </div>
    </div> }, position: { x: 0, y: 0 } },

//  { id: '2', type: 'input', data: { label:
//   <div onClick = {()=>alert("You are Welcome to scene 2")}>
//      <div className="card" >
//           <img className="card-img-top" src="https://picsum.photos/seed/picsum/200/300" alt="Card-image-cap"/>
//              <div className="card-body">
//                  <p className="card-text">Scene two</p>
//              </div>
//      </div>
//   </div> }, position: { x: 400, y: 500 } },



// { id: '3', type: 'input', data: { label:
// <div onClick = {()=>alert("You are Welcome to scene 3")}>
//    <div className="card" >
//         <img className="card-img-top" src="https://picsum.photos/200/300" alt="Card-image-cap"/>
//            <div className="card-body">
//                <p className="card-text">Scene three</p>
//            </div>
//    </div>
// </div> }, position: { x: 200, y: 300 } },

// { id: '4', type: 'input', data: { label:
//   <div onClick = {()=>alert("You are Welcome to scene 4")}>
//      <div className="card" >
//           <img className="card-img-top" src="https://picsum.photos/id/237/200/300" alt="Card-image-cap"/>
//              <div className="card-body">
//                  <p className="card-text">Scene four</p>
//              </div>
//      </div>
//   </div> }, position: { x: 130, y: 230 } },


    // you can also pass a React component as a label
//     { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },

    // { id: 'e1-2', source: '1', target: '2', animated: true },
    // { id: 'e1-3', source: '1', target: '3', animated: true },
    // { id: 'e1-4', source: '2', target: '4', animated: true },
    // { id: 'e1-5', source: '3', target: '4', animated: true },

    
  ];

  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
  };
  

const MindNode = () => {

    const [elements, setElements] = useState(initialElements);
    const [name, setName] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [url, setUrl] = useState("")

    // saving data into local storage coding start
    // useEffect(() => {
    //   setElements(JSON.parse(localStorage.getItem("MyvedioScenes")))
    // }, [])

    // const updateAddScene = (elements) =>{
    //   localStorage.setItem("MyvedioScenes", JSON.stringify(elements))
    //   setElements(elements)
    // }
    

     // saving data into local storage coding end

    //  now replace setElements by updateAddScene

    const fetchScenes = ()=>{
      Axios.get("http://localhost:3001/fetchVedioScenes/1").then(res=>{
        console.log("this is a fetch scene", res)
        let array = "";
        res.data.forEach((item)=>{
          array  += `{
            id: ${item.id}
            <div onClick = {()=>alert("You are Welcome to new scene ")}>
            data:{ lable: <div className="card" >
               <img className="card-img-top" src="https://picsum.photos/200/300/?blur" height = '50px' alt="Card-image-cap"/>
               
                  <div className="card-body">
                      <p className="card-text">{item.name}</p>
                      <p className="card-text">{item.thumbnail}</p>
                      <p className="card-text">{item.vedio_url}</p>
                  </div>
          </div>
       </div>},
       position: {x:${Math.random() * window.innerWidth}, y:${Math.random() * window.innerHeight}}
      }`;

        });
        console.log("this is wat i want see on console",array);
        setElements(array);
  
        console.log("this is a array", array)

      
      }).catch(err=>{
        console.log("this is err in vedioscene", err)
      })
    }


    useEffect(() => {
      // Update the document title using the browser API
      fetchScenes();
    });
    const addScene = ()=>{
      Axios.post("http://localhost:3001/insert", {
        name:name,
        thumbnail:thumbnail,
        vedio_url:url
      }).then(res=>{
        console.log('THIS is add scene',res )
        fetchScenes();
      }).catch(err=>{
        console.log("this is err in addscene", err)
      })
       let temp = <div onClick = {()=>alert("You are Welcome to new scene ")}>
       <div className="card" >
            <img className="card-img-top" src="https://picsum.photos/200/300/?blur" height = '50px' alt="Card-image-cap"/>
            
               <div className="card-body">
                   <p className="card-text">{name}</p>
                   <p className="card-text">{thumbnail}</p>
                   <p className="card-text">{url}</p>
               </div>
       </div>
    </div>; 
      setElements(e=> e.concat({
            id:(e.length+1).toString(),
            data:{label: temp},
            position: {x:Math.random() * window.innerWidth, y:Math.random() * window.innerHeight}
        }))
    }


    const onConnect = (params) => setElements((els) => addEdge(params, els));

    const onElementsRemove = (elementsToRemove) => {
      setElements((els) => removeElements(elementsToRemove, els))
    };

    console.log("this is an element, ", elements );

  
  
  return (
      
        <>
        <ReactFlow 
        elements={elements}
        onLoad={onLoad}
        style = {{width:'100%',height:'90vh' }}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        connectionLineStyle = {{stroke:"#add", strokeWidth:2}}
        connectionLineType = 'bezier'
      snapToGrid={true}
      snapGrid={[16, 16]}
        >

<Background
      color='#888'
      gap={16}
      
    />

<MiniMap
      nodeColor={(node) => {
        switch (node.type) {
          case 'input':
            return 'red';
          case 'default':
            return '#00ff00';
          case 'output':
            return 'rgb(0,0,255)';
          default:
            return '#eee';
        }
      }}
      nodeStrokeWidth={3}
    />
 <Controls/>
 </ReactFlow>
        
            <div>
                <input type="text" 
                onChange = {e=> setName(e.target.value)}
                name='title'
                />
                <input type="text"
                onChange = {e=> setThumbnail(e.target.value)}
                name='thumbnail'
                 />
                 <input type="text"
                onChange = {e=> setUrl(e.target.value)}
                name='url'
                 />
                
                <button type = 'button'
                onClick = {addScene}
                >Add Scene</button>
            </div>
            
        </>
    )
    
}
export default MindNode
