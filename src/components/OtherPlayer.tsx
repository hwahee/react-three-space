import { Sphere, useGLTF, Html } from '@react-three/drei'
import { useEffect } from 'react'
import { Euler, Vector3 } from 'three'
import { useSocket } from '../network/useSocket'

const OtherPlayer = () => {
    const { socket, playerList } = useSocket()

    const glb = useGLTF('https://raw.githubusercontent.com/hwahee/myResource/master/butterfly.glb')

    return <>
        {
            Object.entries(playerList)
                .filter(i => i[1].id && i[1].id !== socket.id)
                .map(i => {
                    return <Sphere key={i[1].id} position={new Vector3(i[1].pos.x, i[1].pos.y, i[1].pos.z)} rotation={new Euler(0, i[1].rot.y, 0)}>
                        <meshBasicMaterial color={'white'} transparent opacity={0} />
                        <Sphere rotation={new Euler(i[1].rot.x, 0, 0)}>
                            <meshBasicMaterial color={'white'} transparent opacity={0} />
                            <group >
                                <primitive object={glb.scene} scale={[25, 25, 25]} />
                            </group>
                        </Sphere>
                        {/* <AnimationController modelRef={innerRef} animations={glb.animations} actionName={props.actionName}/> */}
                    </Sphere>
                })
        }
    </>
}

export { OtherPlayer }