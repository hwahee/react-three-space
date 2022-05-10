import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Plane } from '@react-three/drei'
import { AxisIndicator } from './components/AxisIndicator';
import { Player } from './components/Player';



// const Camera = () => {
// 	const ref = useRef<PerspectiveCameraImpl>()
// 	return <PerspectiveCamera ref={ref} />
// }

function App() {
	return (
		<div id='canvas'>
			<Canvas>
				<ambientLight />
				<Player position={[0, 1, 0]} speed={4} />
				<pointLight position={[10, 10, 10]} />
				<Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
					<meshPhongMaterial color={'yellowgreen'} />
				</Plane>
				<AxisIndicator length={50} negative />
			</Canvas>
		</div>
	);
}

export default App;
