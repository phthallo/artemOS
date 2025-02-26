import Draggable from "react-draggable";
import { useState, forwardRef } from "react";
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
                bounds="parent"
                defaultPosition={props.position}>
                <div id={props.id} ref = {ref} className="absolute bg-terminal rounded-b-md">
                    <div className="w-full bg-white h-full p-2 rounded-t-md">
                        { props.closeable ? <button className="border border-black px-2 text-sm rounded-lg text-black" onClick={() => props.openState.setIsOpen((prev: string[]) => [...prev.filter(window => window !== props.id) ])}>x</button> : null }
                    </div>
                    {props.children}
                </div>
            </Draggable>
        :
        null }
        </>
    )
})

export default Window