import { useEffect, useState } from "react"
import _ from 'lodash'
declare global {
    interface Window {
        keyboardInputEnabled: boolean
    }
}

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
    }
    const detachWindowKeyboardInput = () => {
        if (!window.keyboardInputEnabled) return;
        window.keyboardInputEnabled = false;
        window.removeEventListener('keydown', keydownEvent)
        window.removeEventListener('keyup', keyupEvent)
    }
    const keydownEvent = (e: KeyboardEvent) => {
        if (e.repeat) return
        if (keyStat[e.key]) return

        setKeyStat(k => {
            const ret = { ...k }
            ret[e.key] = true
            return ret
        })
    }
    const keyupEvent = (e: KeyboardEvent) => {
        setKeyStat(k => {
            const ret = { ...k }
            delete ret[e.key]
            return ret
        })
    }

    return keyStat
}
export { useKeyboard }