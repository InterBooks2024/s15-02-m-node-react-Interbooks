import axios from "axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { SelectCountry } from "./SelectCountry";

export const Register = () => {
    const BASE_URL = "https://s15-02-m-node-react-interbooks.onrender.com/api";
    const REGISTER = "/user/register";
    const [loading, setLoading] = useState(false)
    const [userCountrySel, setUserCountrySel] = useState('');
    const [errorGenres, setErrorGenres] = useState(false);

    function onChangeCountry(value){
        const countryName = value.replace(/^[^\w\s]*/, '').trim();
        setUserCountrySel(countryName);
        // version de pais con Emoji
        // setUserCountrySel(value);
    }
    useEffect(() => {
        
    }, [userCountrySel]);

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
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };
            const { data } = await axios.post(RUTA, dataUser, config);
            localStorage.setItem("jwt", data.token);
            setLoading(false)
            return data
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

    // funcion del formulario--- handlesubmit pertenece a react-hook-form
    const onSubmit = handleSubmit(async (data)=> {

        // data que necesita el POST      {
        //     "email": "usuarioprueba@example.com",
        //     "password": "Usuarioprueba1!",
        //     "username": "Usuarioprueba",
        //     "favoriteGenres": ["fiction","mystery"],
        //     "country": "Argentina",
        //     "postalCode": 1870,
        //     "phoneNumber": 123456789
        //   }
        const body = {
            "email": data.email,
            "password": data.password,
            "username": data.userName,
            "favoriteGenres": selectedGenres, //colocar un select ??
            "country": userCountrySel,
            "postalCode": data.postalCode, //preguntar si es string
            "phoneNumber": data.phoneNumber, //preguntar si es string
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
    
    const genres = [
        "Fantasía",
        "Ciencia Ficción",
        "Novela",
        "Romance",
        "Terror",
        "Suspenso",
        "Biografía"
    ];
    
    const [selectedGenres, setSelectedGenres] = useState([]);
    
    const handleOnChange = (genre) => {
        if (selectedGenres.includes(genre)) {
        setSelectedGenres(selectedGenres.filter(item => item !== genre));
        } else {
        if (selectedGenres.length < 3) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setErrorGenres(true);
            setTimeout(() => {
            setErrorGenres(false);
            },3000)
        }
        }
    }
    return (
        <div className="max-w-md ">
            {/* <ToastContainer position="top-right" /> */}
            <h2 className="text-cyan-400 text-2xl font-bold mb-8">Registro</h2>
            <form onSubmit={onSubmit} className="w-full mx-auto " noValidate>

                    {/* User Name */}
                <label className="block font-[600] text-zinc-400" htmlFor="name">Nombre de Usuario *</label>
                <input 
                    className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
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
                        value: /^[a-zA-Z0-9\s]{2,30}$/,
                        message: "El nombre solo debe contener letras y números",
                    },
                    })}
                />
                {errors.userName && (
                <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                    {errors.userName.message}
                </span>
                )}
                    
                    {/* Email */}
                <label className="block font-[600] text-zinc-400" htmlFor="email">Correo Electrónico *</label>
                <input 
                className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
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
                <label className="block font-[600] text-zinc-400" htmlFor="password">Contraseña *</label>
                <input 
                    className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
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
                <p className="text-zinc-400">Tu contraseña debe contener:</p>
                <ul className="list-disc text-xs">
                    <li className="text-green-500">8 letras como mínimo.</li>
                    <li className="text-red-500">Un caracter especial como mínimo.</li>
                    <li className="text-red-500">Un número como mínimo.</li>
                </ul>
            {/* Confirm Password */}
                <label className="block font-[600] text-zinc-400" htmlFor="confirmPassword">Repite tu contraseña *</label>
                <input 
                    className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
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
                <label className="block font-[600] text-zinc-400" htmlFor="country">País *</label>
                <SelectCountry onChange={onChangeCountry}
                                id = "country"
                                className ="my-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl  focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
                                name="country"
                />   

                    {/* Phone Number */}
                <label className="block font-[600] text-zinc-400" htmlFor="phoneNumber">Número de Teléfono *</label>
                <input 
                    className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
                    id="phoneNumber" 
                    type="number"
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
                    {/* Postal Code */}
                <label className="block font-[600] text-zinc-400" htmlFor="postalCode">Código Postal *</label>
                <input 
                    className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400  text-zinc-600 h-10  placeholder:text-zinc-300 " 
                    id="postalCode" 
                    type="number"
                    placeholder="Escribe tu Código Postal"
                    {...register("postalCode", {
                    required: {
                        value: true,
                        message: "El Código Postal es requerido",
                    }
                    })}
                />
                {errors.postalCode && (
                    <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                    {errors.postalCode.message}
                    </span>
                )}
                    {/* Checkbox de Géneros */}
                <div>
                <label className="block font-[600] text-zinc-400" htmlFor="genres">Elige tus géneros favoritos</label>
                    <div className="grid grid-cols-3 mt-4">
                        {genres.map((genre, index) => (
                            <div key={index} className="text-sm flex items-center gap-1 text-zinc-400">
                                <input
                                    type="checkbox"
                                    id={`custom-checkbox-${index}`}
                                    name={genre}
                                    value={genre}
                                    checked={selectedGenres.includes(genre)}
                                    onChange={() => handleOnChange(genre)}
                                />
                                <label htmlFor={`custom-checkbox-${index}`}>{genre}</label>
                            </div>
                        ))}
                    </div>
                    {errorGenres && (
                    <span className="block absolute ml-4 text-red-600 text-xs">
                    Solo hasta 3 opciones puedes elegir.
                    </span>
                )}
                </div>

            <button type="submit" disabled={loading}
                className="w-full mt-6 text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:bg-cyan-500 rounded-3xl text-sm font-bold px-5 py-2.5 me-2 mb-2"
                >
    {/*         {
                    loading ? <Spinner/> : <span>Enviar</span>
                }       */}
                <span>REGISTRARSE</span>
                </button>
                <p className="text-zinc-400 mt-8 text-sm text-wrap">Al hacer click en Resgistrarse, aceptas las <span className="text-cyan-400 underline cursor-pointer">Condiciones de uso de Interbook</span>, incluídas las <span className="text-cyan-400 underline cursor-pointer">Condiciones de Suscripción</span> y la <span className="text-cyan-400 underline cursor-pointer">Política de Privacidad</span>.</p>
            </form>
            {/* <h3 className="text-cyan-400 text-xl font-bold mt-16">¿Ya tienes una cuenta?</h3>
            <button 
                onClick={ console.log('Emi')
                // ()=>navigate("/register")
            }
            className="w-full mt-6 text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:bg-cyan-500 rounded-3xl text-sm font-bold px-5 py-2.5 me-2 mb-2"
            >
            INICIAR SESIÓN
            </button> */}

        </div>
  )
}
