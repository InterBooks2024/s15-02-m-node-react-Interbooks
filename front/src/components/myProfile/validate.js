export const validate = (formData, setFormErrors) => {
    const errors = {};
    if (!formData.username) {
      errors.username = "El nombre es requerido";
    } else if (formData.username.length < 2 || formData.username.length > 30) {
      errors.username = "El nombre debe tener entre 2 y 30 caracteres";
    } else if (!/^[a-zA-Z0-9\s]{2,30}$/.test(formData.username)) {
      errors.username = "El nombre solo debe contener letras y números";
    }
    if (!formData.email) {
      errors.email = "Correo es requerido";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(formData.email)) {
      errors.email = "Correo no válido. Debe ser formato 'ejemplo@mail.com'";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "El teléfono es requerido";
    } else if (formData.phoneNumber.length < 2 || formData.phoneNumber.length > 12) {
      errors.phoneNumber = "El teléfono debe tener entre 2 y 12 números";
    }
    if (!formData.postalCode) {
      errors.postalCode = "El Código Postal es requerido";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };