import create from 'zustand'

interface IStateBears {
    bears: number
    increase:()=>void
}

const useStore = create<IStateBears>(set => ({
    bears: 0,
    increase: () => set((state: IStateBears) => ({ bears: state.bears + 1 })),
    remove: () => set({ bears: 0 }),
}))

function BearCounter() {
	const bears = useStore((state) => state.bears)
	return <h1>{bears} around here</h1>
}
function Controls(){
	const inc=useStore(state=>state.increase)
	return <button onClick={inc}>one up</button>
}

export type { IStateBears }
export { useStore }