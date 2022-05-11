import React, { useEffect } from 'react'
import * as THREE from 'three'
import { useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Object3D } from 'three'

type AnimationControllerProps = {
    modelRef: any //React.MutableRefObject<THREE.Group | undefined | null>
    animations: THREE.AnimationClip[]
}

function AnimationController(props: AnimationControllerProps) {
    const animationApi = useAnimations(props.animations, props.modelRef)
    const {actions}=animationApi
    const selectedAction = '_bee_hover'
    const blendDuration = 0.5
    useEffect(()=>{
        animationApi.clips.forEach(i=>{
            animationApi.actions.i = animationApi.mixer.clipAction(i, props.modelRef)
        })
        console.log(animationApi)
    },[])

    useEffect(() => {
        actions[selectedAction]?.reset().fadeIn(blendDuration).play()
        return () => void actions[selectedAction]?.fadeOut(blendDuration)
    }, [actions, selectedAction, blendDuration])

    return null
}
export { AnimationController }