import Draggable from "react-draggable";
import { forwardRef } from "react";
import { RefObject } from 'react';

type WindowProps = { 
    children: React.ReactNode;
    closeable: boolean;
    position: {
        x: number,
        y: number
    }
    openState: {
        isOpen: string[],
        setIsOpen: (value: any) => void
    },
    id: string
}

const Window = forwardRef<HTMLDivElement, WindowProps>((props, ref) => {
    return (
        <>
        { (props.openState.isOpen).includes(props.id) ? 
            <Draggable
                nodeRef={ref as RefObject<HTMLElement>}
                bounds="#desktop"
                defaultPosition={props.position}>
                <div id={props.id} ref = {ref} className="absolute shadow-lg z-50">
                    <div className="flex items-center justify-center flex-row w-full bg-white h-full p-2 rounded-t-md shadow-lg">
                        { props.closeable ? <button className="absolute left-2 border border-black px-1 text-sm rounded-lg text-black font-titles hover:text-gray-600 hover:border-gray-600" onClick={() => props.openState.setIsOpen((prev: string[]) => [...prev.filter(window => window !== props.id) ])}>✕</button> : null }
                    <span className = "mx-auto text-gray-800 font-titles">{props.id}</span>
                    </div>
                    {props.children}
                </div>
            </Draggable>
        :
        null }
        </>
    )
})
Window.displayName = 'Window';

export default Window