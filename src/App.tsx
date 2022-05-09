import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three'
import { useStore } from './store';
import { Canvas} from '@react-three/fiber';
import { Box, OrbitControls, Plane, Sphere } from '@react-three/drei'
import { useKeyboard } from './useKeyboard';


const Player = (props: { position: number[] }) => {
	const { position: pos } = props

	const ref = useRef<THREE.Mesh>(null!)
	const [vel, setVel] = useState([0, 0, 0])
	const keyStat = useKeyboard()

	useEffect(() => {
		ref.current.position.set(pos[0], pos[1], pos[2])
	}, [ref.current])

	useEffect(() => { }, [keyStat])

	return <>
		<Sphere ref={ref}>
			<meshPhongMaterial color={'hotpink'} />
		</Sphere>
	</>
}

function App() {
	return (
		<div id='canvas'>
			<Canvas>
				<OrbitControls />
				<ambientLight />
				<Player position={[0, 1, 0]} />
				<pointLight position={[10, 10, 10]} />
				<Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
					<meshPhongMaterial color={'yellowgreen'} />
				</Plane>
			</Canvas>
		</div>
	);
}

export default App;
