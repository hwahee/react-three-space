import { Box } from "@react-three/drei"

const AxisIndicator = (props: { length?: number, thickness?: number, negative?: boolean }) => {
	const { length = 4, thickness = 1 / 16, negative } = props
	return <>
		<Box scale={[length, thickness, thickness]} position={[length / 2, 0, 0]}>
			<meshBasicMaterial color={'red'} />
		</Box>
		<Box scale={[thickness, length, thickness]} position={[0, length / 2, 0]}>
			<meshBasicMaterial color={'blue'} />
		</Box>
		<Box scale={[thickness, thickness, length]} position={[0, 0, length / 2]}>
			<meshBasicMaterial color={'green'} />
		</Box>
		{negative && <>
			<Box scale={[length, thickness, thickness]} position={[-length / 2, 0, 0]}>w
				<meshBasicMaterial color={'cyan'} transparent opacity={0.5} />
			</Box>
			<Box scale={[thickness, length, thickness]} position={[0, -length / 2, 0]}>
				<meshBasicMaterial color={'yellow'} transparent opacity={0.5} />
			</Box>
			<Box scale={[thickness, thickness, length]} position={[0, 0, -length / 2]}>
				<meshBasicMaterial color={'magenta'} transparent opacity={0.5} />
			</Box>
		</>}
	</>
}

export {AxisIndicator}