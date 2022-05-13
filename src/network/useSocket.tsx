import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Vector3 } from 'three'
import { IPlayerInfo } from '../types';

interface ISocketData{
    timestamp:number,
    payload:any
}

const PlayersContext = createContext<{socket:Socket, playerList:{ [key: string]: IPlayerInfo }}>({socket:io(''), playerList:{}});
const PlayersProvider = ({children}:{children:any}) => {
    const [socket, setSocket] = useState<Socket>(null!)
    const [socketConnected, setSocketConnected] = useState(false)
    const [timestamp, setTimestamp]=useState(new Date().getTime())
    const [playerList, setPlayerList] = useState<{ [key: string]: IPlayerInfo }>({})
    useEffect(() => {
        setSocket(io(`localhost:2002`))
    }, [])

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            setSocketConnected(socket.connected);
        });
        socket.on('disconnect', () => {
            setSocketConnected(socket.connected);
        });

        socket.on('update', (data:ISocketData) => {
            /// 데이터가 왔을 때 가장 최근에 받은 데이터보다 이전의 데이터이면 그것은 받지 않는다  
            /// 최신의 데이터이면 받고 마지막으로 받은 데이터의 타임스탬프로 업데이트한다
            if( data.timestamp < timestamp) return
            setPlayerList(data.payload)
            setTimestamp(data.timestamp)
        })
    }, [socket]);

    // useEffect(() => {
    //     console.log(`from socket: `, playerList)
    // }, [playerList])

    return <PlayersContext.Provider value={{ socket, playerList }} children={children} />
}

const useSocket=()=>{
    const {socket, playerList}=useContext(PlayersContext)
    return {socket, playerList}
}

export { PlayersProvider, useSocket }

