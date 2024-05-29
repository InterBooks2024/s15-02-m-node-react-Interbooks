import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { SelectCountry } from "./SelectCountry";

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [userCountry, setUserCountry] = useState('');

    function onChangeCountry(value){
        setUserCountry(value)
        console.log('pais', value)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
      } = useForm();

      //funcion aparte por si la queremos trasladar a un hook
    const authRegistro = async (dataUser) => {
        const RUTA = `${BASE_URL}${REGISTER}`;
        try {
            const { data } = await axios.post(RUTA, dataUser);
            localStorage.setItem("jwt", data.token);
            
            // toast.success("Se ha registrado correctamente", {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            //     transition: Bounce,
            //     });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // funcion del formulario
    const onSubmit = handleSubmit(async (data)=> {

        const body = {
            "userName": data.userName,
            "email": data.email,
            "phoneNumber": data.phoneNumber,
            "postalCode": data.postalCode,
            "country": userCountry, //colocar un select
            "password": data.password,
            "favouriteGenres": data.favouriteGenres //colocar un select
        }

        try {
        setLoading(true)
        const rta = await authRegistro(body)
        // navigate(rutaInicio)
        } catch (error) {
        setLoading(false)
        handleError(error)
        }
    })
    const handleError = (error) => {
        console.log('Error:', error)
        // throw toast.error(error.message, {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     transition: Bounce,
        //     });
    };

    return (
        <div className="w-96 mx-auto">
            {/* <ToastContainer position="top-right" /> */}
            <br /><br /><br />
            <h2 className="text-cyan-400 text-2xl font-bold mb-8">Registro</h2>
            <form onSubmit={onSubmit} className="w-full my-0 mx-auto " noValidate>

                    {/* User Name */}
                <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="name">Nombre de Usuario *</label>
                <input 
                    className="my-2 py-[10px] px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base h-10 placeholder:text-zinc-300" 
                    id="name" 
                    type="text"
                    placeholder="Escribe tu nombre"
                    {...register("userName", {
                    required: {
                        value: true,
                        message: "El nombre es requerido",
                    },
                    minLength: {
                        value: 2,
                        message: "El nombre debe tener al menos 2 caracteres"
                    },
                    maxLength: {
                        value: 30,
                        message: "El nombre debe tener como máximo 30 caracteres"
                    },
                    pattern: {
                        value: /^[a-zA-Z\s]{2,30}$/,
                        message: "El nombre solo debe contener letras",
                    },
                    })}
                />
                {errors.userName && (
                <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                    {errors.userName.message}
                </span>
                )}
                    
                    {/* Email */}
                <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="email">Correo Electrónico *</label>
                <input 
                className="my-2 py-[10px] px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base h-10 placeholder:text-zinc-300" 
                id="email" 
                type="email"
                placeholder="Escribe tu email"
                {...register("email", {
                    required: {
                    value: true,
                    message: "Correo es requerido",
                    },
                    pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Correo no válido. Debe ser formato 'ejemplo@mail.com'",
                    },
                })}
                />
                {errors.email && (
                <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                    {errors.email.message}
                </span>
                )}

                    {/* Password */}
                <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="password">Contraseña *</label>
                <input 
                    className="my-2 py-[10px] px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base h-10 placeholder:text-zinc-300" 
                    id="password" 
                    type="password"
                    placeholder="Escribe tu contraseña"
                    {...register("password", {
                    required: {
                        value: true,
                        message: "La contraseña es requerida",
                    },
                    minLength: {
                        value: 8,
                        message: "Debe contener al menos 8 caracteres"
                    },
                    maxLength: {
                        value: 15,
                        message: "Debe tener como maximo 15 caracteres"
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                        message: "Debe contener almenos una mayuscula, minuscula, número, caract. especial '$@$!%*?&'",
                    },
                    })}
                />
                {errors.password && (
                    <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                    {errors.password.message}
                    </span>
                )}
                {/* <p className="text-zinc-400">Tu contraseña debe contener:</p>
                <ul className="list-disc text-xs">
                    <li className="text-green-500">8 letras como mínimo.</li>
                    <li className="text-red-500">Un caracter especial como mínimo.</li>
                    <li className="text-red-500">Un número como mínimo.</li>
                </ul> */}
            {/* Confirm Password */}
                <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="confirmPassword">Repite tu contraseña *</label>
                <input 
                    className="my-2 py-[10px] px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base h-10 placeholder:text-zinc-300" 
                    id="confirmPassword" 
                    type="password"
                    placeholder="Escribe tu contraseña"
                    {...register("confirmPassword", {
                    required: {
                        value: true,
                        message: "Confirmar contraseña es requerida",
                    },
                    validate: value => value == watch('password')  || 'Las contraseñas no coinciden'
                    })}
                />
                {errors.confirmPassword && (
                    <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                    {errors.confirmPassword.message}
                    </span>
                )}
                    {/* Country */}
                <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="country">País *</label>
                <SelectCountry onChange={onChangeCountry} />   

                    {/* Phone Number */}
                <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="phoneNumber">Número de Teléfono *</label>
                <input 
                    className="my-2 py-[10px] px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base h-10 placeholder:text-zinc-300" 
                    id="phoneNumber" 
                    type="text"
                    placeholder="Escribe tu número de teléfono"
                    {...register("phoneNumber", {
                    required: {
                        value: true,
                        message: "El teléfono es requerido",
                    },
                    minLength: {
                        value: 2,
                        message: "El teléfono debe tener al menos 2 números"
                    },
                    maxLength: {
                        value: 12,
                        message: "El teléfono debe tener como máximo 12 números"
                    },
                    })}
                />
                {errors.phoneNumber && (
                    <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                    {errors.phoneNumber.message}
                    </span>
                )}
                {/* Postal Code
                <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="postalCode">Número de Teléfono *</label>
                <input 
                    className="my-2 py-[10px] px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base h-10 placeholder:text-zinc-300" 
                    id="postalCode" 
                    type="text"
                    placeholder="Escribe tu Código Postal"
                    {...register("postalCode", {
                    required: {
                        value: true,
                        message: "El Código Postal es requerido",
                    },
                    minLength: {
                        value: 2,
                        message: "El teléfono debe tener al menos 2 números"
                    },
                    maxLength: {
                        value: 12,
                        message: "El teléfono debe tener como máximo 12 números"
                    },
                    })}
                />
                {errors.postalCode && (
                    <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                    {errors.postalCode.message}
                    </span>
                )} */}
                <div>
                    <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="postalCode">Elige tus géneros favoritos</label>
                    <p>Terror / Ficcion / Histórico</p>
                    <p>comedia / Misterio / Infantil</p>
                    <p>Drama / Romance / Avetura</p>

                {/* Hacer map con esto
                    <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                    /> */}
                </div>

            <button 
                className="w-full mt-6 text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:bg-cyan-500 rounded-[20px] text-sm font-bold px-5 py-2.5 me-2 mb-2"
                >
    {/*         {
                    loading ? <Spinner/> : <span>Enviar</span>
                }       */}
                <span>REGISTRARSE</span>
                </button>
                <p className="text-zinc-400 mt-8 text-sm text-wrap">Al hacer click en Resgistrarse, aceptas las <span className="text-cyan-400 underline cursor-pointer">Condiciones de uso de Interbook</span>, incluídas las <span className="text-cyan-400 underline cursor-pointer">Condiciones de Suscripción</span> y la <span className="text-cyan-400 underline cursor-pointer">Política de Privacidad</span>.</p>
            </form>
            <h3 className="text-cyan-400 text-xl font-bold mt-16">¿Ya tienes una cuenta?</h3>
            <button 
                onClick={ console.log('Emi')
                // ()=>navigate("/register")
            }
            className="w-full mt-6 text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:bg-cyan-500 rounded-[20px] text-sm font-bold px-5 py-2.5 me-2 mb-2"
            >
            INICIAR SESIÓN
        </button>

        </div>
  )
}

export default Register