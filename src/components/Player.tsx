import { OrbitControls, PerspectiveCamera, Sphere, useGLTF } from "@react-three/drei"
import { PrimitiveProps, useFrame } from "@react-three/fiber"
import React, { forwardRef, useEffect, useRef } from "react"
import { Vector3 } from "three"
import { useKeyboard } from "../useKeyboard"
import { PerspectiveCamera as PerspectiveCameraImpl } from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';


const Model = forwardRef((props: Object, ref) => {
    const glb = useGLTF('https://raw.githubusercontent.com/hwahee/myResource/master/Bee.glb')
    return (
        <Sphere ref={ref}>
            <meshBasicMaterial color={'hotpink'} transparent opacity={0} />
            <primitive object={glb.scene} scale={[0.125, 0.125, 0.125]} />
        </Sphere>
    )

})

const Player = (props: { position: number[], speed?: number }) => {
    const { position, speed = 1 } = props
    const ref = useRef<THREE.Mesh>(null!)
    const modelRef = useRef<THREE.Mesh>(null!)
    const camRef = useRef<PerspectiveCameraImpl>(null!)
    const ctrlRef = useRef<OrbitControlsImpl>(null!)
    const keyStat = useKeyboard()

    useEffect(() => {
        ref.current.position.set(position[0], position[1], position[2])
    }, [ref.current])

    useEffect(() => { }, [keyStat])
    useFrame((state, delta) => {
        const yewDelta = (keyStat['q'] ? 1 : 0) + (keyStat['e'] ? -1 : 0)
        const rot = ref.current.rotation
        ref.current.rotation.set(rot.x, rot.y + yewDelta * delta, rot.z)
        const pitchDelta = (keyStat['r'] ? 1 : 0) + (keyStat['f'] ? -1 : 0)
        const modelRot = modelRef.current.rotation
        modelRef.current.rotation.set(modelRot.x + pitchDelta * delta, modelRot.y, modelRot.z)

        const frontVec = (keyStat['w'] ? 1 : 0) + (keyStat['s'] ? -1 : 0)
        const sideVec = (keyStat['a'] ? 1 : 0) + (keyStat['d'] ? -1 : 0)
        const elevVec = (keyStat['v'] ? 1 : 0) + (keyStat['c'] ? -1 : 0)
        const boost = keyStat['shift'] ? 5 : 1
        const moveVec = new Vector3(sideVec, elevVec, frontVec).normalize().applyEuler(rot).multiplyScalar(speed * boost)

        const posnow = ref.current.position
        const posmove = [
            posnow.x + moveVec.x * delta,
            posnow.y + moveVec.y * delta,
            posnow.z + moveVec.z * delta]
        ref.current.position.set(posmove[0], posmove[1], posmove[2])

        // ctrlRef.current.target.set(posmove[0], posmove[1], posmove[2])
    })

    return <>
        <Sphere ref={ref}>
            <PerspectiveCamera ref={camRef} makeDefault position={[0, 1, -2.5]} rotation={[0, Math.PI, 0]} fov={90} />
            {/* <OrbitControls ref={ctrlRef} /> */}
            <meshBasicMaterial color={'hotpink'} transparent opacity={0} />
            <Model ref={modelRef} />
        </Sphere>
    </>
}

export { Player }