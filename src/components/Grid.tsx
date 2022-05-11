import { Box } from "@react-three/drei"

const Grid = (props: { size?: number, gap?: number, thickness?: number }) => {
    const { size = 100, gap = 5, thickness = 1 / 32 } = props
    const arr = Array.from(Array(Math.floor(size / gap)).keys())
    const grid = () => {
        return <>
            {arr.map(i => <>{
                arr.map(j =>
                    <Box key={`x${i}-${j}`} scale={[size, thickness, thickness]} position={[0, gap * i / 2, gap * j / 2]}>
                        <meshBasicMaterial color={'red'} />
                    </Box>)
            }</>)}
            {arr.map(i => <>{
                arr.map(j =>
                    <Box key={`y${i}-${j}`} scale={[thickness, size, thickness]} position={[gap * j / 2, 0, gap * i / 2]}>
                        <meshBasicMaterial color={'blue'} />
                    </Box>)
            }</>)}
            {arr.map(i => <>{
                arr.map(j =>
                    <Box key={`z${i}-${j}`} scale={[thickness, thickness, size]} position={[gap * i / 2, gap * j / 2, 0]}>
                        <meshBasicMaterial color={'green'} />
                    </Box>)
            }</>)}
        </>
    }

    return grid()
}

export { Grid }