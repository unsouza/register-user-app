"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "./icons";
import { Input } from "./input";
import { Label } from "./label";

interface InputWithLabelProps {
    label: string;
    password?: boolean;
    type: string;
    placeholder: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
    ({ label, type, password, placeholder, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="flex flex-col gap-2 w-[310px] md:w-[380px]">
                <Label className="text-sm font-medium text-[#666E79]">{label}</Label>
                <div className="relative w-full">
                    <Input
                        ref={ref}
                        placeholder={placeholder}
                        type={password && showPassword ? "text" : type}
                        className="bg-[#F3F4F6] h-[50px] w-full rounded-md outline-none border-none focus:border-none focus:ring-0"
                        {...props}
                    />
                    {password && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeSlashIcon className="text-[#666E79] hover:text-[#666666]"/> : <EyeIcon className="text-[#666E79] hover:text-[#666666]"/>}
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

export default InputWithLabel;