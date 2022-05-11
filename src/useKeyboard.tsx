import { useEffect, useState } from "react"
import _ from 'lodash'
declare global {
    interface Window {
        keyboardInputEnabled: boolean
    }
}

type KeyStat = {[key: string]: boolean}

function useKeyboard() {
    const [keyStat, setKeyStat] = useState<{ [key: string]: boolean }>({})
    useEffect(() => {
        attachWindowKeyboardInput()
        return () => {
            detachWindowKeyboardInput()
        }
    }, [])

    const attachWindowKeyboardInput = () => {
        if (window.keyboardInputEnabled) return;
        window.keyboardInputEnabled = true;
        window.addEventListener('keydown', keydownEvent)
        window.addEventListener('keyup', keyupEvent)
        window.addEventListener('blur', blurEvent)
    }
    const detachWindowKeyboardInput = () => {
        if (!window.keyboardInputEnabled) return;
        window.keyboardInputEnabled = false;
        window.removeEventListener('keydown', keydownEvent)
        window.removeEventListener('keyup', keyupEvent)
        window.removeEventListener('blur', blurEvent)
    }
    const keydownEvent = (e: KeyboardEvent) => {
        if (e.repeat) return
        if (keyStat[e.key.toLowerCase()]) return

        setKeyStat(k => {
            const ret = { ...k }
            ret[e.key.toLowerCase()] = true
            return ret
        })
    }
    const keyupEvent = (e: KeyboardEvent) => {
        setKeyStat(k => {
            const ret = { ...k }
            delete ret[e.key.toLowerCase()]
            return ret
        })
    }
    const blurEvent = () => {
        setKeyStat(k => ({}))
    }   
    return keyStat
}
export type {KeyStat}
export { useKeyboard }