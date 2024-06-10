import axios from "axios";
import { useState } from "react";
import { SelectCountry } from "../register/SelectCountry";
import { useUserContext } from "../../hooks/useUser";
import { validate } from "../../utils/validate";

export const MyProfile = () => {
  const {tokenJwt, user, setUser} = useUserContext()
  
  const BASE_URL = "https://s15-02-m-node-react-interbooks.onrender.com/api";
  // const BASE_LOCAL = "http://localhost:3001/api";
  const ENDPOINT = `/user/edit/${user.id}`;
  const [loading, setLoading] = useState(false);
  const [userCountrySel, setUserCountrySel] = useState('');
  const [errorGenres, setErrorGenres] = useState(false);
  const [formData, setFormData] = useState(user);
  const [formErrors, setFormErrors] = useState({});
  const [selectedGenres, setSelectedGenres] = useState(user?.favoriteGenres);

  function onChangeCountry(value) {
    const countryName = value.replace(/^[^\w\s]*/, '').trim();
    setUserCountrySel(countryName);
  }

  const editarUsuario = async (dataUser) => {
    const RUTA = `${BASE_URL}${ENDPOINT}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
        authorization: `Bearer ${tokenJwt}`,
      };
      const { data } = await axios.patch(RUTA, dataUser, config);
      setLoading(false);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const getUserData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    const { data } = await axios(`${BASE_URL}/user/get/${user.id}`, config);
    setUser(data)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate(formData, setFormErrors)) return;

    const body = {
      username: formData.username,
      favoriteGenres: selectedGenres,
      country: userCountrySel,
      postalCode: formData.postalCode,
      phoneNumber: formData.phoneNumber,
    };
    try {
      setLoading(true);
      await editarUsuario(body)
      await getUserData()
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.log('Error:', error);
    setLoading(false);
  };

  const handleOnChange = (genre) => {
    if (selectedGenres.includes(genre)){
      const existingGenres = structuredClone(selectedGenres);
      const newList = existingGenres.filter(item => item !== genre);
      return setSelectedGenres(newList)
    }else{
      if (selectedGenres.length < 3) {
        setSelectedGenres([...selectedGenres, genre]);
      }else{
        setErrorGenres(true);
        setTimeout(() => {
          setErrorGenres(false);
        }, 3000);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  return (
    <section>
      <div className="max-w-md w-full">
        <h2 className="text-cyan-400 text-2xl font-bold mb-8 text-center">Editar tu perfil</h2>
        <form onSubmit={onSubmit} className="w-full mx-auto" noValidate>
          <label className="block font-[600] text-zinc-400" htmlFor="name">Nombre de Usuario *</label>
          <input
            className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400 text-zinc-600 h-10 placeholder:text-zinc-300"
            id="name"
            type="text"
            name="username"
            placeholder="Escribe tu nombre"
            value={formData.username}
            onChange={handleInputChange}
          />
          {formErrors.username && (
            <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
              {formErrors.username}
            </span>
          )}

          <label className="block font-[600] text-zinc-400" htmlFor="email">Correo Electrónico *</label>
          <input
            className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400 text-zinc-600 h-10 placeholder:text-zinc-300"
            id="email"
            type="email"
            name="email"
            placeholder="Escribe tu email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
              {formErrors.email}
            </span>
          )}

          <label className="block font-[600] text-zinc-400" htmlFor="country">País *</label>
          <SelectCountry onChange={onChangeCountry}
            id="country"
            className="my-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400 text-zinc-600 h-10 placeholder:text-zinc-300"
            name="country"
          />

          <label className="block font-[600] text-zinc-400" htmlFor="phoneNumber">Número de Teléfono *</label>
          <input
            className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400 text-zinc-600 h-10 placeholder:text-zinc-300"
            id="phoneNumber"
            type="number"
            name="phoneNumber"
            placeholder="Escribe tu número de teléfono"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {formErrors.phoneNumber && (
            <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
              {formErrors.phoneNumber}
            </span>
          )}

          <label className="block font-[600] text-zinc-400" htmlFor="postalCode">Código Postal *</label>
          <input
            className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400 text-zinc-600 h-10 placeholder:text-zinc-300"
            id="postalCode"
            type="number"
            name="postalCode"
            placeholder="Escribe tu Código Postal"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
          {formErrors.postalCode && (
            <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
              {formErrors.postalCode}
            </span>
          )}

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
            Enviar Cambios
          </button>
          <p className="text-zinc-400 mt-8 text-sm text-wrap">
            Al hacer click en Resgistrarse, aceptas las <span className="text-cyan-400 underline cursor-pointer">Condiciones de uso de Interbook</span>, incluídas las <span className="text-cyan-400 underline cursor-pointer">Condiciones de Suscripción</span> y la <span className="text-cyan-400 underline cursor-pointer">Política de Privacidad</span>.
          </p>
        </form>
      </div>
      <br /><br />
      <p className="font-[600] text-zinc-400">¡No será lo mismo de nosotros sin ti!</p>
      <p className="font-[600] text-zinc-400">Usar solo si estás seguro</p>
      <button className="text-end rounded-lg bg-interbook-500 text-white font-bold px-5 py-2 w-fit ms-auto">
        Darse de Baja
      </button>
    </section>
  );
};


                //     {/* Password */}
                //     <label className="block font-[600] text-zinc-400" htmlFor="password">Contraseña *</label>
                //     <input 
                //         className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
                //         id="password" 
                //         type="password"
                //         placeholder="Escribe tu contraseña"
                //         {...register("password", {
                //         required: {
                //             value: true,
                //             message: "La contraseña es requerida",
                //         },
                //         minLength: {
                //             value: 8,
                //             message: "Debe contener al menos 8 caracteres"
                //         },
                //         maxLength: {
                //             value: 15,
                //             message: "Debe tener como maximo 15 caracteres"
                //         },
                //         pattern: {
                //             value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                //             message: "Debe contener almenos una mayuscula, minuscula, número, caract. especial '$@$!%*?&'",
                //         },
                //         })}
                //     />
                //     {errors.password && (
                //         <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                //         {errors.password.message}
                //         </span>
                //     )}
                //     <p className="text-zinc-400">Tu contraseña debe contener:</p>
                //     <ul className="list-disc text-xs">
                //         <li className="text-green-500">8 letras como mínimo.</li>
                //         <li className="text-red-500">Un caracter especial como mínimo.</li>
                //         <li className="text-red-500">Un número como mínimo.</li>
                //     </ul>
                // {/* Confirm Password */}
                //     <label className="block font-[600] text-zinc-400" htmlFor="confirmPassword">Repite tu contraseña *</label>
                //     <input 
                //         className="my-2 py-2 px-4 w-full outline-none border-2 border-zinc-400 rounded-3xl focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300" 
                //         id="confirmPassword" 
                //         type="password"
                //         placeholder="Escribe tu contraseña"
                //         {...register("confirmPassword", {
                //         required: {
                //             value: true,
                //             message: "Confirmar contraseña es requerida",
                //         },
                //         validate: value => value == watch('password')  || 'Las contraseñas no coinciden'
                //         })}
                //     />
                //     {errors.confirmPassword && (
                //         <span className="block absolute -m-2 ml-4 text-red-600 text-xs">
                //         {errors.confirmPassword.message}
                //         </span>
                //     )}