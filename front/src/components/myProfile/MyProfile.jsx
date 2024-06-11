// import axios from "axios";
import { useEffect, useState } from "react";
import { SelectCountry } from "../register/SelectCountry";
import { useUserContext } from "../../hooks/useUser";
import { useProfileContext } from "../../hooks/useProfile";
import { useBook } from "../../hooks/useBook";
import { validate } from "./validate";

export const MyProfile = () => {
  const {user} = useUserContext()
  const {options} = useBook()
  const {editProfile, deleteProfile} = useProfileContext()

  
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [userCountrySel, setUserCountrySel] = useState('');
  const [errorGenres, setErrorGenres] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    postalCode: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);

  function onChangeCountry(value) {
    const countryName = value.replace(/^[^\w\s]*/, '').trim();
    setUserCountrySel(countryName);
  }

  useEffect(() => {}, [userCountrySel]);
  useEffect(() => {
    setFormData({
      username: user.username || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      postalCode: user.postalCode || '',
    });
    
    setSelectedGenres(user.favoriteGenres || []);
  }, []);


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
      const rta = await editProfile(body, setLoading);
      console.log(rta);
    } catch (error) {
      handleError(error, setLoading);
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      setLoadingDelete(true);
      const rta = await deleteProfile(setLoadingDelete);
      console.log(rta);
      alert('Cuenta eliminada con exito');
    } catch (error) {
      handleError(error, setLoadingDelete);
    }
  };

  const handleError = (error, setLoading) => {
    console.log('Error:', error);
    setLoading(false);
  };

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
              {options.genres.map((genre, index) => (
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
      <button onClick={handleDelete} disabled={loadingDelete}
        className="text-end rounded-lg bg-interbook-500 text-white font-bold px-5 py-2 w-fit ms-auto">
        Darse de Baja
      </button>
    </section>
  );
};