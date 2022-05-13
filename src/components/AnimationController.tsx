import React, { useEffect } from 'react'
import * as THREE from 'three'
import { useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Object3D } from 'three'

type AnimationControllerProps = {
    modelRef: any //React.MutableRefObject<THREE.Group | undefined | null>
    animations: THREE.AnimationClip[]
    actionName:string
}

function AnimationController(props: AnimationControllerProps) {
    const animationApi = useAnimations(props.animations, props.modelRef)
    const {actions}=animationApi
    const blendDuration = 0.5

    useEffect(()=>{
        if(!props.modelRef) return
        animationApi.clips.forEach(i=>{
            animationApi.actions.i = animationApi.mixer.clipAction(i, props.modelRef)
        })
        console.log(animationApi)
    },[props.modelRef])

    useEffect(() => {
        actions[props.actionName]?.reset().fadeIn(blendDuration).play()
        return () => void actions[props.actionName]?.fadeOut(blendDuration)
    }, [actions, props.actionName, blendDuration])

    return null
}
export { AnimationController }