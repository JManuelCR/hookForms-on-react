import { useState } from "react";
import { useForm } from "react-hook-form";
import { Koder } from "./types/common.types";
import KoderCard from "./components/KoderCard";
import clsx from "clsx";

export default function App() {
  const [koders, setKoders] = useState<Koder[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Koder>()

  function onSubmit(data: Koder) {
    console.log("esta es la data", data);
    setKoders([
      { firstName: data.firstName, lastName: data.lastName },
      ...koders
    ]);
    reset();
  }

  function onDelete(indexToDelete: number) {
    koders.splice(indexToDelete, 1);
    setKoders([...koders]);
  }

  function empty() {
    setKoders([]);
    reset();
  }

  const firstNameClassName = `bg-black border border-white/10 rounded w-full p-3 ${errors.firstName ? 'border-red-500' : "" }`

  return (
    <main className="bg-black min-h-screen flex items-center text-white p-10 flex-col gap-10">
      <h1 className="text-3xl">Koders</h1>

      <form  onSubmit={ handleSubmit(onSubmit)} className="flex flex-row gap-2 w-full justify-center max-w-md">
        <input
          id="text"
          type="text"
          placeholder="Nombre"
          className={clsx(
            "bg-black border border-white/10", 
            "rounded w-full p-3",
            { "border-red-500": errors.firstName}
          )}
          { ...register( 'firstName', { 
            required: { value: true, message: 'El nombre es requerido'}, 
            minLength: { value: 3, message: 'El nombre debe tener almenos 3 caracteres'} }
            ) 
          }
        />
        <input
          id="text"
          type="text"
          placeholder="Apellido"
          className={clsx(
            "bg-black border border-white/10", 
            "rounded w-full p-3",
            { "border-red-500": errors.lastName}
          )}
          { ...register( 'lastName', { 
            required: { value: true, message: 'El apellido es requerido'}, 
            minLength: { value: 3, message: 'El apellido debe tener almenos 3 caracteres'} }
            ) 
          }
        />
        <button
          type="submit" // asegurarse que tiene el type submit
          className="bg-white text-black flex items-center justify-center p-2 rounded w-1/5"
        >
          +
        </button>
      </form>

      {
        errors.firstName && <p>{errors.firstName.message}</p>
      }
      {
        errors.lastName && <p>{errors.lastName.message}</p>
      }

      <section className="w-full flex flex-col gap-3">
        {koders.map((koder, index) => {
          return (
            <KoderCard
              key={`koder-${index}`}
              onDelete={() => onDelete(index)}
              koder={koder}
            />
          );
        })}
      </section>

      <button
        className="bg-purple-500 w-full max-w-md p-2 rounded"
        onClick={empty}
      >
        🗑️ BORRAR TODO 🗑️
      </button>
    </main>
  );
}
