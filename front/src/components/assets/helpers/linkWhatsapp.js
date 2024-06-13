
export const linkWhatsapp = (book, action, phoneNumber) => {
    console.log('action', action)
console.log('phoneNumber', phoneNumber)
console.log('book', book)
    const user = JSON.parse(localStorage.getItem("user")) || '';
    
    const message = `Hola! Soy ${user.username}.
Me comunico por medio de INTERBOOK y tengo una solicitud del libro:
Titulo: ${book.title}
Autor: ${book.author}

${action == 'Regalo' ? `Si te querés comunicar conmigo lo podés hacer a este número o al ${user.phoneNumber}, así coordinamos la entrega del regalo.` : ''}${action == 'Venta' ? `Te quiero comentar el precio y los medios de pago. Si te querés comunicar conmigo lo podés hacer a este número o al ${user.phoneNumber}, así coordinamos la venta.` : ''}

Muchas gracias!
`
const link = `http://wa.me/${phoneNumber}?text=${encodeURI(message)}`
    return link
}