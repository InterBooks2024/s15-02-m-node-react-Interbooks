import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";


const Login = () => {
    const BASE_URL = "https://s15-02-m-node-react-interbooks.onrender.com/api";
    const LOGIN = "/auth/login";
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
      } = useForm();

      //funcion aparte por si la queremos trasladar a un hook
    const authRegistro = async (dataUser) => {
        const RUTA = `${BASE_URL}${LOGIN}`;
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };
            const { data } = await axios.post(RUTA, dataUser, config);
            localStorage.setItem("jwt", data.jwt);
            setLoading(false)
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // funcion del formulario--- handlesubmit pertenece a react-hook-form
    const onSubmit = handleSubmit(async (data)=> {
        const body = {
            "email": data.email,
            "password": data.password,
        }
        console.log(body)
        try {
            setLoading(true)
            const rta = await authRegistro(body)
        // navigate(rutaInicio)
        } catch (error) {
            handleError(error)
        }
    })
    const handleError = (error) => {
        console.log('Error:', error)
        setLoading(false)
        // throw toast.error(error.message, {   ver .promise
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
            <h2 className="text-cyan-400 text-2xl font-bold mb-8">Iniciar sesión</h2>
            <form onSubmit={onSubmit} className="w-full my-0 mx-auto " noValidate>

                    {/* Email */}
                <label className="mt-4 block text-[16px] font-[600] text-zinc-400" htmlFor="email">Correo Electrónico *</label>
                <input 
                className="my-2 py-[10px] px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
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
                    className="my-2 py-[10px] px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
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
                <p className="text-zinc-400 mt-8 text-sm text-wrap underline">¿Olvidaste tu contraseña?</p>

            <button type="submit" disabled={loading}
                className="w-full mt-6 text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:bg-cyan-500 rounded-[20px] text-sm font-bold px-5 py-2.5 me-2 mb-2"
                >
    {/*         {
                    loading ? <Spinner/> : <span>Enviar</span>
                }       */}
                <span>INICIAR SESIÓN</span>
                </button>
                <p className="text-zinc-400 mt-8 text-sm text-wrap">¿No tienes una cuenta con nosotros? <span className="text-cyan-400 cursor-pointer underline">Regístrate</span></p>
                <p className="text-zinc-400 mt-8 text-sm text-wrap">Al iniciar sesión o continuar, aceptas las <span className="text-cyan-400 cursor-pointer underline">Condiciones de uso</span> y la <span className="text-cyan-400 underline cursor-pointer">Política de Privacidad</span>de Interbook.</p>
            </form>
        </div>
  )
}

export default Login