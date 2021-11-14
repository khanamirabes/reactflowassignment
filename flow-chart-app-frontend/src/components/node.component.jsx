import React, { useState, useEffect } from 'react';
import Axios from 'axios'

import ReactFlow, {addEdge, updateEdge, Background, Controls, MiniMap, removeElements} from 'react-flow-renderer';
import ButtonEdge from './ButtonEdge';

const initialElements = [
  { id: '-1', type: 'input', data: { label:
    <div onClick = {()=>alert("You are Welcome to scene 1")}>
       <div className="card" >
            <img className="card-img-top" src="https://picsum.photos/200/300/?blur"  height = '50px' alt="Card-image-cap"/>
               <div className="card-body">
                   <p className="card-text">Starting Scene</p>
               </div>
       </div>
    </div> }, position: { x: 0, y: 0 } },
    { id: 'e1-2', source: '1', target: '2' },
    ];

const edgeTypes = {
      buttonedge: ButtonEdge,
    };    

const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
  };

const MindNode = () => {

    const [elements, setElements] = useState(initialElements);
    const [name, setName] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [url, setUrl] = useState("")
    const [err, setErr] = useState("")

    

    const onConnect = (params) =>{
      setElements((els) => addEdge({ ...params, type: 'buttonedge' }, els));
      console.log("This is param1",params);
      Axios.post("http://localhost:3001/insert/sceneflow", params,).then(res=>{
        console.log('THIS is add sceneFlow',res )
        fetchScenes();
      }).catch(err=>{
        console.log("this is err in sceneFlow", err)
      })
    
    };

      // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = (oldEdge, newConnection) =>
  setElements((els) => updateEdge(oldEdge, newConnection, els));

    const onElementsRemove = (elementsToRemove) => {
      setElements((els) => removeElements(elementsToRemove, els))
    };
    const fetchScenes = ()=>{
      setElements(initialElements);
      Axios.get("http://localhost:3001/fetchVedioScenes/1").then(res=>{
        console.log("this is a fetch scene", res)
        let array = [];
        res.data.forEach((item)=>{
            let temp = <div >
       <div className="card" >
            <img className="card-img-top" src={item.thumbnail} height = '50px' alt="Thubnail Image"/>
            
               <div className="card-body"  onClick = {()=>alert(`You are Welcome to scene : ${item.name}` )}>
                   <p className="card-text">{item.name}</p>
                   <p className="card-text">{item.thumbnail}</p>
                   <p className="card-text">{item.vedio_url}</p>
               </div>
       </div>
    </div>; 
          array.push({
            id: item.id +"",
            data:{ label:  temp},
       position: JSON.parse(item.postion) 
      });

        });
        console.log("this is wat i want see on console",array);
        setElements(e=> e.concat(...array));
  
        console.log("this is a array", array)

      
      }).catch(err=>{
        console.log("this is err in vedioscene", err)
      })
      
      Axios.get("http://localhost:3001/fetchVedioScenesflow/1").then(res=>{
        console.log("this is a fetch scene", res)
        let array = [];
        res.data.forEach((item)=>{
        // setElements((els) => addEdge(params, els));
        delete item["id"];
        item["id"] = `reactflow__edge--${item.source+ item.sourceHandle+ "-"+item.target+ item.targetHandle}`;
        item["type"] = 'buttonedge';
           array.push(item);
      })
      console.log("this is a fetchVedioScenesflow", array)
      setElements(e=> e.concat(...array));
      }).catch(err=>{
        console.log("this is err in vediosceneflow", err)
      })
    }
    useEffect(() => {
      // Update the document title using the browser API
      fetchScenes();
    },[1]);
    const addScene = ()=>{
      if(name =="" || name.trim().length == 0){
          setErr("name can not be empty;");
          return;
      }
      if(thumbnail =="" || thumbnail.trim().length == 0){
        setErr("thumbnail url can not be empty;");
        return;
        }
      if(url =="" || url.trim().length == 0){
        setErr("vedio url can not be empty;");
        return;
        }
   
      Axios.post("http://localhost:3001/insert", {
        name:name,
        thumbnail:thumbnail,
        vedio_url:url,
        position: JSON.stringify({x:Math.random() * window.innerWidth, y:Math.random() * window.innerHeight})
      }).then(res=>{
        console.log('THIS is add scene',res )
        fetchScenes();
      }).catch(err=>{
        console.log("this is err in addscene", err)
      })
    }
    console.log("this is an element, ", elements );
    return (
      
        <>
        <ReactFlow 
        elements={elements}
        // onLoad={onLoad}
        style = {{width:'100%',height:'90vh' }}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        connectionLineStyle = {{stroke:"#add", strokeWidth:2}}
        connectionLineType = 'bezier'
      snapToGrid={true}
      edgeTypes={edgeTypes}
      snapGrid={[16, 16]}
      onEdgeUpdate={onEdgeUpdate}
      onLoad={onLoad}

      key="edge-with-button"
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
                placeholder="name"
                onChange = {e=> setName(e.target.value)}
                name='title'
                />
              
                <input type="text"
                  placeholder="thumbnail url"
                onChange = {e=> setThumbnail(e.target.value)}
                name='thumbnail'
                 />
                 <input type="text"
                  placeholder="video url"
                onChange = {e=> setUrl(e.target.value)}
                name='url'
                 />
                
                <button type = 'button'
                onClick = {addScene}
                >Add Scene</button>
                <br/>
                <br/>
                 <span  className="error">{err}</span>
            </div>
            
        </>
    )
    
}
export default MindNode