
export const linkWhatsapp = ({book, action}) => {
    const user = JSON.parse(localStorage.getItem("user")) || '';
    
    const message = `Hola! Soy ${user.username}.
Me comunico por medio de INTERBOOK y estoy interesado en el libro:
Titulo: ${book.title}
Autor: ${book.author}

${action == 'Regalo' ? `Si te querés comunicar conmigo lo podés hacer a este número o al ${user.phoneNumber}, así coordinamos la entrega.` : ''}${action == 'Venta' ? `Te quiero consultar el precio y los medios de pago. Si te querés comunicar conmigo lo podés hacer a este número o al ${user.phoneNumber}, así coordinamos.` : ''}

Muchas gracias!
`
const link = `http://wa.me/${book.user.phoneNumber}?text=${encodeURI(message)}`
    return link
}