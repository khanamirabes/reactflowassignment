import React, { useState, useEffect } from "react";
import Axios from "axios";

import ReactFlow, {
  addEdge,
  updateEdge,
  Background,
  Controls,
  MiniMap,
  removeElements,
} from "react-flow-renderer";
import ButtonEdge from "./ButtonEdge";

const initialElements = [
  {
    id: "-1",
    type: "input",
    data: {
      label: (
        <div onClick={() => alert("You are Welcome to scene 1")}>
          <div className="card">
            <img
              className="card-img-top"
              src="https://picsum.photos/200/300/?blur"
              height="50px"
              alt="Card-image-cap"
            />
            <div className="card-body">
              <p className="card-text">Starting Scene</p>
            </div>
          </div>
        </div>
      ),
    },
    position: { x: 0, y: 0 },
  },
  { id: "e1-2", source: "1", target: "2" },
];

const edgeTypes = {
  buttonedge: ButtonEdge,
};

const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const MindNode = () => {
  const [elements, setElements] = useState(initialElements);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");

  const onConnect = (params) => {
    setElements((els) => addEdge({ ...params, type: "buttonedge" }, els));
    console.log("This is param1", params);
    Axios.post("http://3.108.221.163:3001/insert/sceneflow", params)
      .then((res) => {
        console.log("THIS is add sceneFlow", res);
        fetchScenes();
      })
      .catch((err) => {
        console.log("this is err in sceneFlow", err);
      });
  };

  const nodePositionUpdate = (event, node) => {
    console.log("node", node);
    let temp = { id: node.id, position: JSON.stringify(node.position) };
    console.log("temp", temp);
    Axios.put("http://3.108.221.163:3001/videoscenes/position", temp)
      .then((res) => {
        console.log("THIS is update nodePositionUpdate", res);
        // fetchScenes();
      })
      .catch((err) => {
        console.log("this is err in nodePositionUpdate", err);
      });
  };

  // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };

  const fetchScenes = async () => {
    setElements(initialElements);

    const scene = await  Axios.get("http://3.108.221.163:3001/fetchVedioScenes/1")
      
        console.log("this is a fetch scene", scene);
        let array = [];
        scene.data.forEach((item) => {
          let temp = (
            <div>
              <div className="card">
                <img
                  className="card-img-top"
                  src={item.thumbnail}
                  height="50px"
                  alt="Thubnail Image"
                />
                <div
                  className="card-body"
                  onClick={() =>
                    alert(`You are Welcome to scene : ${item.name}`)
                  }
                >
                  <p className="card-text">{item.name}</p>
                  <p className="card-text">{item.thumbnail}</p>
                  <p className="card-text">{item.vedio_url}</p>
                </div>
              </div>
            </div>
          );
          array.push({
            id: item.id + "",
            data: { label: temp },
            position: JSON.parse(item.postion),
          });
        });
        console.log("this is wat i want see on console", array);
        setElements((e) => e.concat(...array));
        console.log("this is a array", array);
     

    const sceneEdge = await Axios.get("http://3.108.221.163:3001/fetchVedioScenesflow/1")
      
        console.log("this is a fetch scene", sceneEdge);
        let Erray = [];
        sceneEdge.data.forEach((item) => {
          // setElements((els) => addEdge(params, els));
          delete item["id"];
          item["id"] = `reactflow__edge--${
            item.source +
            item.sourceHandle +
            "-" +
            item.target +
            item.targetHandle
          }`;
          item["type"] = "buttonedge";
          Erray.push(item);
        });
        console.log("this is a fetchVedioScenesflow", Erray);
        setElements((e) => e.concat(...Erray));
      
  };
  useEffect(() => {
    // Update the document title using the browser API
    fetchScenes();
  }, [1]);


  const addScene = async () => {
    if (name == "" || name.trim().length == 0) {
      setErr("name can not be empty;");
      return;
    }
    if (thumbnail == "" || thumbnail.trim().length == 0) {
      setErr("thumbnail url can not be empty;");
      return;
    }
    if (url == "" || url.trim().length == 0) {
      setErr("vedio url can not be empty;");
      return;
    }



    const sceneAdd = await Axios.post("http://3.108.221.163:3001/insert", {
      name: name,
      thumbnail: thumbnail,
      vedio_url: url,
      position: JSON.stringify({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }),
    })
      
        console.log("THIS is add scene", sceneAdd);
        setName("takreem");

        setThumbnail("")
        setUrl("")
        fetchScenes();
        
        console.log("Takreem is pro")

      
  };
  console.log("this is an element, ", elements);
  return (
    <>
      <ReactFlow
        elements={elements}
        // onLoad={onLoad}
        style={{ width: "100%", height: "90vh" }}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        connectionLineStyle={{ stroke: "#add", strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        edgeTypes={edgeTypes}
        snapGrid={[16, 16]}
        onEdgeUpdate={onEdgeUpdate}
        onLoad={onLoad}
        onNodeDragStop={nodePositionUpdate}
        key="edge-with-button"
      >
        <Background color="#888" gap={16} />

        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case "input":
                return "red";
              case "default":
                return "#00ff00";
              case "output":
                return "rgb(0,0,255)";
              default:
                return "#eee";
            }
          }}
          nodeStrokeWidth={3}
        />
        <Controls />
      </ReactFlow>

      <div>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          name="title"
        />

        <input
          type="text"
          placeholder="thumbnail url"
          onChange={(e) => setThumbnail(e.target.value)}
          name="thumbnail"
        />
        <input
          type="text"
          placeholder="video url"
          onChange={(e) => setUrl(e.target.value)}
          name="url"
        />

        <button type="button" onClick={addScene}>
          Add Scene
        </button>
        <br />
        <br />
        <span className="error">{err}</span>
      </div>
    </>
  );
};
export default MindNode;
