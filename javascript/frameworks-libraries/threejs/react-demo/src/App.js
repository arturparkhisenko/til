import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';

import './App.css';

function FlatSquare(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1, 1] : [1, 1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      {/* https://threejs.org/docs/#api/en/core/BufferGeometry */}
      <planeBufferGeometry attach="geometry" args={[3, 3, 3, 3]} />
      <meshBasicMaterial
        attach="material"
        color={hovered === true ? 'red' : 'green'}
        wireframe={true}
      />
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          reactjs.org
        </a>
        ,&nbsp;
        <a
          className="App-link"
          href="https://threejsfundamentals.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          threejsfundamentals.org
        </a>
        ,&nbsp;
        <a
          className="App-link"
          href="https://www.npmjs.com/package/react-three-fiber"
          target="_blank"
          rel="noopener noreferrer"
        >
          npm:react-three-fiber
        </a>
      </header>

      <Canvas>
        <FlatSquare position={[2.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
