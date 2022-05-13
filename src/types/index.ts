/**
 * 서버와 클라이언트에서 공통으로 사용하는 타입, 인터페이스를 정의합니다.
 */



 interface IVector3 {
    x: number,
    y: number,
    z: number,
}
interface IEuler {
    x: number,
    y: number,
    z: number,
}
interface IPlayerInfo {
    id: string
    pos: IVector3
    rot: IEuler
    action: string
}

export type { IPlayerInfo }