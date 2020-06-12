export interface IConn {
    creatConnection(): Promise<void>
    disconnect(): Promise<void>
}