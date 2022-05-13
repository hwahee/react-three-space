import { Sphere, useGLTF, Html } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { Euler, Vector3 } from 'three'
import { useSocket } from '../network/useSocket'
import { TCharacter } from '../types'
import { CharacterSelector } from './Character'

const OtherPlayer = (props: { id: string }) => {
    const { playerList } = useSocket()
    const [action, setAction] = useState('idle')
    const [character, setCharacter] = useState<TCharacter>('bee')
    const ref = useRef<THREE.Mesh>(null)
    const modelRef = useRef<THREE.Mesh>(null)
    const innerRef = useRef<THREE.Group>(null)

    useEffect(() => {
        if (!(ref.current && modelRef)) return
        const data = playerList[props.id]
        ref.current.position.set(data.pos.x, data.pos.y, data.pos.z)
        ref.current.rotation.set(0, data.rot.y, 0)
        modelRef.current!.rotation.set(data.rot.x, 0, 0)
        setAction(data.action)
    }, [playerList[props.id]])

    useEffect(() => {
        setCharacter(playerList[props.id].character)
    }, [playerList[props.id].character])

    return <Sphere ref={ref} >
        <meshBasicMaterial color={'white'} transparent opacity={0} />
        <Sphere ref={modelRef}>
            <meshBasicMaterial color={'white'} transparent opacity={0} />
            
            <CharacterSelector ref={innerRef} character={character} action={action} />
        </Sphere>
        {/* <AnimationController modelRef={innerRef} animations={glb.animations} actionName={props.actionName}/> */}
    </Sphere>
}

const OtherPlayers = () => {
    const { socket, playerList } = useSocket()
    return <>{Object.entries(playerList)
        .filter(i => i[1].id && i[1].id !== socket.id)
        .map(i => <OtherPlayer key={i[1].id} id={i[1].id} />)}</>
}

export { OtherPlayers }