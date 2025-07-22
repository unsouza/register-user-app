
"use client";

import { Label } from "./label";
import InputMask from "@mona-health/react-input-mask";

interface CustomInputMaskProps{
    label: string;
    mask: string;
    value: string;
    maskPlaceholder: string;
    placeholder: string;
}

function InputWithMask({ label, mask, value, maskPlaceholder, placeholder, ...maskProps }: CustomInputMaskProps) {
    return (
        <div className="flex flex-col gap-2 w-[310px] md:w-[380px]">
            <Label htmlFor={label} className="text-sm font-medium text-[#666E79]">{label}</Label>
            <div className="relative w-full">
                <InputMask
                    mask={mask}
                    value={value}
                    placeholder={placeholder}
                    maskPlaceholder={maskPlaceholder}
                    className="bg-[#F3F4F6] h-[50px] w-full rounded-md outline-none border-none focus:border-none focus:ring-0 px-3"
                    {...maskProps}
                />
            </div>
        </div>
    );
}

export default InputWithMask;