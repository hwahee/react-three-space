import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Plane } from '@react-three/drei'
import { AxisIndicator } from './components/AxisIndicator';
import { Player } from './components/Player';
import { Grid } from './components/Grid';
import { OtherPlayers } from './components/OtherPlayer';
import { PlayersProvider } from './network/useSocket';

function App() {
	return (
		<div id='canvas'>
			<Canvas>
				<ambientLight />
				<PlayersProvider>
					<Player character='butterfly' position={[0, 1, 0]} speed={4} />
					<OtherPlayers />
				</PlayersProvider>
				<pointLight position={[10, 10, 10]} />
				<Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
					<meshPhongMaterial color={'yellowgreen'} />
				</Plane>
				<AxisIndicator length={50} negative />
				{/* <Grid /> */}
			</Canvas>
		</div>
	);
}

export default App;
