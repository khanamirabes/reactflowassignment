
import React, { useState } from 'react';

import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from 'react-flow-renderer';
import { Button ,Modal} from 'react-bootstrap';
// import './index.css';

const foreignObjectSize = 40;


export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    handleShow()
  };
  
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <button
            className="edgebutton"
            onClick={(event) => onEdgeClick(event, id)}
          >
            x
          </button>
        </body>
      </foreignObject>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Scene Flow Rule</Modal.Title>
        </Modal.Header>
        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder = 'Enter scene rule script' style= {{margin: '10px'}}>

</textarea>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}