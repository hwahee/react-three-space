import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three'
import { useStore } from './store';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, PerspectiveCamera, Plane, Sphere } from '@react-three/drei'
import { useKeyboard } from './useKeyboard';
import { PerspectiveCamera as PerspectiveCameraImpl, Vector3 } from 'three';

const Player = (props: { position: number[], speed?: number }) => {
	const { position, speed = 1 } = props
	const ref = useRef<THREE.Mesh>(null!)
	const keyStat = useKeyboard()

	useEffect(() => {
		ref.current.position.set(position[0], position[1], position[2])
	}, [ref.current])

	useEffect(() => { }, [keyStat])
	useFrame((state, delta) => {
		const rotDelta = (keyStat['q'] ? 1 : 0) + (keyStat['e'] ? -1 : 0)
		const rot = ref.current.rotation
		ref.current.rotation.set(rot.x, rot.y + rotDelta * delta, rot.z)

		const frontVec = (keyStat['w'] ? 1 : 0) + (keyStat['s'] ? -1 : 0)
		const sideVec = (keyStat['a'] ? 1 : 0) + (keyStat['d'] ? -1 : 0)
		const moveVec = new Vector3(sideVec, 0, frontVec).normalize().applyEuler(rot).multiplyScalar(speed)

		const posnow = ref.current.position
		ref.current.position.set(posnow.x + moveVec.x * delta, posnow.y, posnow.z + moveVec.z * delta)
	})

	return <>
		<Sphere ref={ref}>
			<PerspectiveCamera makeDefault position={[0, 2, 0]} rotation={[0, Math.PI, 0]}/>
			<Box scale={[4, 0.5, 0.5]} position={[2, 0, 0]}>
				<meshPhongMaterial color={'red'} />
			</Box>
			<Box scale={[0.5, 4, 0.5]} position={[0, 2, 0]}>
				<meshPhongMaterial color={'blue'} />
			</Box>
			<Box scale={[0.5, 0.5, 4]} position={[0, 0, 2]}>
				<meshPhongMaterial color={'green'} />
			</Box>
			<meshPhongMaterial color={'hotpink'} />
		</Sphere>
	</>
}

// const Camera = () => {
// 	const ref = useRef<PerspectiveCameraImpl>()
// 	return <PerspectiveCamera ref={ref} />
// }
const AxisIndicator = () => {
	return <>
		<Box scale={[4, 1 / 16, 1 / 16]} position={[2, 0, 0]}>
			<meshPhongMaterial color={'red'} />
		</Box>
		<Box scale={[1 / 16, 4, 1 / 16]} position={[0, 2, 0]}>
			<meshPhongMaterial color={'blue'} />
		</Box>
		<Box scale={[1 / 16, 1 / 16, 4]} position={[0, 0, 2]}>
			<meshPhongMaterial color={'green'} />
		</Box>
	</>
}

function App() {
	return (
		<div id='canvas'>
			<Canvas>
				{/* <OrbitControls /> */}
				<ambientLight />
				<Player position={[0, 1, 0]} speed={4} />
				<pointLight position={[10, 10, 10]} />
				<Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
					<meshPhongMaterial color={'yellowgreen'} />
				</Plane>
				<AxisIndicator />
			</Canvas>
		</div>
	);
}

export default App;
