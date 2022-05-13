import { useGLTF } from "@react-three/drei"
import React, { forwardRef } from "react"
import { TCharacter } from "../types"
import { AnimationController } from "./AnimationController"

const Character = forwardRef((props: { url: string, scale: [number, number, number], actionName?: string }, ref) => {
    const glb = useGLTF(props.url)
    return <>
        <group ref={ref as React.MutableRefObject<THREE.Group>}>
            <primitive object={glb.scene} scale={props.scale} />
        </group>
        <AnimationController modelRef={ref} animations={glb.animations} actionName={props.actionName ?? ""} />
    </>
})

useGLTF.preload('https://raw.githubusercontent.com/hwahee/myResource/master/butterfly.glb')
useGLTF.preload('https://raw.githubusercontent.com/hwahee/myResource/master/Bee.glb')

const Butterfly = forwardRef((props: { actionName?: string }, ref) => {
    const butterflyActionTranslation = (action?: string) => {
        const list: { [key: string]: string } = {
            "idle": "idle",
            "move": "hover",
        }
        return list[action ?? ""] ?? ""
    }
    return <Character ref={ref} url={'https://raw.githubusercontent.com/hwahee/myResource/master/butterfly.glb'} scale={[25, 25, 25]} actionName={butterflyActionTranslation(props.actionName)} />
})

const Bee = forwardRef((props: { actionName?: string }, ref) => {
    const beeActionTranslation = (action?: string) => {
        const list: { [key: string]: string } = {
            "idle": "_bee_idle",
            "move": "_bee_hover",
        }
        return list[action ?? ""] ?? ""
    }
    return <Character ref={ref} url={'https://raw.githubusercontent.com/hwahee/myResource/master/Bee.glb'} scale={[0.125, 0.125, 0.125]} actionName={beeActionTranslation(props.actionName)} />
})

const CharacterSelector = forwardRef((props: { character: TCharacter, action: string }, ref) => {
    if (props.character === "bee")
        return <Bee ref={ref} actionName={props.action} />
    else
        return <Butterfly ref={ref} actionName={props.action} />
})

export { CharacterSelector }