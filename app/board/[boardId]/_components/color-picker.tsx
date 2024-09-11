"uce client"
import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";
import React from "react";

interface ColorPicker  {
    onChange: (color:Color)=>void;
};

const ColorPicker = ({
    onChange
}: ColorPicker) => {
  return <div
    className="flex flex-wrap gap-2 item-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200"
  >

    <ColorButton 
        color={{r:0,g:0,b:0}}
        onClick={onChange}
    />
    <ColorButton 
        color={{r:255,g:255,b:255}}
        onClick={onChange}
    />
    <ColorButton 
        color={{r:255,g:0,b:0}}
        onClick={onChange}
    />
    <ColorButton 
        color={{r:0,g:255,b:0}}
        onClick={onChange}
    />
    {/* <ColorButton 
        color={{r:0,g:0,b:255}}
        onClick={onChange}
    />
    <ColorButton 
        color={{r:255,g:255,b:0}}
        onClick={onChange}
    />
    <ColorButton 
        color={{r:255,g:0,b:255}}
        onClick={onChange}
    />
    <ColorButton 
        color={{r:0,g:255,b:255}}
        onClick={onChange}
    /> */}
    <ColorButton 
        color={{r:128,g:0,b:128}} // Purple
        onClick={onChange}
    />
    <ColorButton 
        color={{r:255,g:165,b:0}} // Orange
        onClick={onChange}
    />
    <ColorButton 
        color={{r:75,g:0,b:130}} // Indigo
        onClick={onChange}
    />
    <ColorButton 
        color={{r:255,g:192,b:203}} // Pink
        onClick={onChange}
    />
    <ColorButton 
        color={{r:0,g:128,b:128}} // Teal
        onClick={onChange}
    />
    <ColorButton 
        color={{r:173,g:216,b:230}} // Light Blue
        onClick={onChange}
    />

  </div>;
};

interface ColorButtonProps{
    color:Color;
    onClick:(color:Color)=>void;
}

const ColorButton = ({
    color,
    onClick
}: ColorButtonProps) => {
    return <button 
        className="w-6 h-6 rounded-md items-center flex justify-center hover:opacity-75 transition"
        style={{
            background: `${colorToCss(color)}`,
        }}
        onClick={()=>onClick(color)}
        />;
}

export default ColorPicker;