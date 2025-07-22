"use client";

import * as z from "zod";
import { useState } from "react";
import { format } from "date-fns";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import InputWithMask from "@/components/ui/input-mask";
import InputWithLabel from "@/components/ui/input-with-label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().nonempty("O campo nome completo é obrigatório."),
  email: z.string()
    .nonempty("O email é obrigatório.")
    .email("Formato de email inválido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
  passwordConfirmation: z.string().nonempty("A confirmação de senha é obrigatória."),
  phone: z.string().optional(),
  dateBirth: z.date().optional(),
  gender: z.enum(["male", "female"]).optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos de uso." }),
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "As senhas não coincidem.",
  path: ["passwordConfirmation"],
});

type UserFormData = z.infer<typeof formSchema>;

export default function Home() {
  const [showPopover, setShowPopover] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, control } = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: undefined,
      password: "",
      passwordConfirmation: "",
      dateBirth: undefined,
      terms: false as any,
    },
  });

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    console.log("DADOS RECEBIDOS E VALIDADOS PELO ZOD:", data);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
        <Image src="/Logo-2025-hospital-do-Cancer-crt.png" alt="logo" width={89} height={100} />
        <h1 className="text-2xl font-bold text-[#666E79]">Cadastro</h1>
        <p className="text-sm text-gray-500">Preencha os campos abaixo para criar sua conta</p>
      </div>
      <div className="flex w-full items-center justify-center">
        <form className="flex flex-col md:grid md:grid-cols-2 gap-4 mb-4 items-center md:items-start" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-2">
            <InputWithLabel label="Nome completo" placeholder="Digite seu nome completo" type="text" {...register("name")} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col mb-2">
            <InputWithLabel label="Email" placeholder="Digite seu email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col mb-2">
            <InputWithLabel password label="Senha" placeholder="Digite sua senha" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col mb-2">
            <InputWithLabel password label="Confirmar senha" placeholder="Confirme sua senha" type="password" {...register("passwordConfirmation")} />
            {errors.passwordConfirmation && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirmation.message}</p>}
          </div>

          <div className="flex flex-col mb-2">
            <InputWithMask label="Telefone" placeholder="Digite seu telefone" maskPlaceholder="_" {...register("phone")} mask="(99) 99999-9999" value={watch("phone") || ""} />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div className="flex flex-col mb-2">
            <Label htmlFor="dateBirth" className="text-sm font-medium text-[#666E79]">Data de nascimento</Label>
            <Controller
              name="dateBirth"
              control={control}
              render={({ field }) => (
                <Popover open={showPopover} onOpenChange={setShowPopover}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[310px] md:w-[380px] justify-start text-left font-normal bg-[#F3F4F6] h-[50px]">
                      {field.value ? format(field.value, "dd/MM/yyyy") : <span className="text-[#666E79]">dd/mm/aaaa</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                      onDayClick={() => setShowPopover(false)}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.dateBirth && <p className="text-red-500 text-xs mt-1">{errors.dateBirth.message}</p>}
          </div>

          <div className="col-span-2 mb-2">
            <Label htmlFor="gender" className="text-sm font-medium text-[#666E79]">Gênero</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-[#F3F4F6] outline-none h-[50px] w-[310px] md:w-[380px]">
                    <SelectValue placeholder="Selecione seu gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>
          
          <div className="flex items-center mb-2 gap-3">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="terms">Aceito os <span className="text-[#2563EB]">termos de uso</span></Label>
          </div>
          
          {errors.terms && <p className="col-span-2 text-red-500 text-xs mt-1">{errors.terms.message}</p>}
          
          <div className="flex items-center justify-center col-span-2">
            <Button type="submit" className="bg-[#2563EB] h-[50px] text-white px-4 py-2 rounded-md hover:bg-[#1d4ed8] w-[310px] md:w-[380px]">
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}