import { PerspectiveCamera, Sphere, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import { Euler, Vector3 } from "three"
import { KeyStat, useKeyboard } from "../useKeyboard"
import { PerspectiveCamera as PerspectiveCameraImpl } from 'three';
import { AnimationController } from "./AnimationController"
import { useSocket } from "../network/useSocket"
import _ from "lodash"
import { CharacterSelector } from "./Character"
import { TCharacter } from "../types"

const Model = forwardRef((props: {character:TCharacter, actionName:string}, ref) => {
    const {character, actionName:action}=props
    //const glb = useGLTF('https://raw.githubusercontent.com/hwahee/myResource/master/Bee.glb')
    const innerRef = useRef<THREE.Group>(null!)
    return (
        <Sphere ref={ref}>
            <meshBasicMaterial color={'hotpink'} transparent opacity={0} />
            <CharacterSelector ref={innerRef} character={character} action={action} />
        </Sphere>
    )
})

const Player = (props: { character:'bee'|'butterfly',position: number[], speed?: number }) => {
    const { position, speed = 1 } = props
    const keyStat: KeyStat = useKeyboard()
    const [action, setAction]=useState('idle')
    const ref = useRef<THREE.Mesh>(null!)
    const modelRef = useRef<THREE.Mesh>(null!)
    const camRef = useRef<PerspectiveCameraImpl>(null!)
    const {socket}=useSocket()

    useEffect(()=>{
        
        if(!socket) return
        socket.emit('initPlayer', {character:props.character})
    },[])

    useEffect(() => {
        ref.current.position.set(position[0], position[1], position[2])
    }, [ref.current])

    const emit=_.throttle((pos:Vector3, rot:Euler,action:string)=>{
        if(!socket) return
        socket.emit('update',{pos:pos, rot:{x:rot.x, y:rot.y, z:rot.z}, action:action})
    }, 40)

    useFrame((state, delta) => {
        const yewDelta = (keyStat['q'] ? 1 : 0) + (keyStat['e'] ? -1 : 0)
        const rot = ref.current.rotation
        ref.current.rotation.set(rot.x, rot.y + yewDelta * delta, rot.z)
        const pitchDelta = (keyStat['f'] ? 1 : 0) + (keyStat['r'] ? -1 : 0)
        const modelRot = modelRef.current.rotation
        modelRef.current.rotation.set(modelRot.x + pitchDelta * delta, modelRot.y, modelRot.z)

        const rotx = new Euler(modelRot.x, 0, 0)
        const roty = new Euler(0, rot.y, 0)
        const frontVec = (keyStat['w'] ? 1 : 0) + (keyStat['s'] ? -1 : 0)
        const sideVec = (keyStat['a'] ? 1 : 0) + (keyStat['d'] ? -1 : 0)
        const elevVec = (keyStat['v'] ? 1 : 0) + (keyStat['c'] ? -1 : 0)
        const boost = keyStat['shift'] ? 5 : 1
        const moveVec = new Vector3(sideVec, elevVec, frontVec).normalize().applyEuler(rotx).applyEuler(roty).multiplyScalar(speed * boost)

        const posnow = ref.current.position
        const posmove = [
            posnow.x + moveVec.x * delta,
            posnow.y + moveVec.y * delta,
            posnow.z + moveVec.z * delta]
        ref.current.position.set(posmove[0], posmove[1], posmove[2])

        if(action!=='move'){
            if(keyStat['w']||keyStat['s']||keyStat['a']||keyStat['d']||keyStat['v']||keyStat['c']){
                setAction('move')
            }
        }
        if(action!=='idle'){
            if(!(keyStat['w']||keyStat['s']||keyStat['a']||keyStat['d']||keyStat['v']||keyStat['c'])){
                setAction('idle')
            }
        }
        emit(ref.current.position, new Euler(modelRef.current.rotation.x, ref.current.rotation.y, 0), action)
    })

    return <>
        <Sphere ref={ref}>
            <PerspectiveCamera ref={camRef} makeDefault position={[0, 1, -7.5]} rotation={[0, Math.PI, 0]} fov={90} />
            {/* <OrbitControls ref={ctrlRef} /> */}
            <meshBasicMaterial color={'hotpink'} transparent opacity={0} />
            <Model ref={modelRef} character={props.character} actionName={action} />
        </Sphere>
    </>
}

export { Player }