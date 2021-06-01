import React, {useState} from 'react'
import Image from 'next/image'

const Contact = () => {
  const [formResult, setFormResult] = useState('')
  const submitForm = ev => {
    ev.preventDefault()
    const form = ev.target
    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        setFormResult('ok')
      } else {
        setFormResult('error')
      }
    }
    xhr.send(data)
  }

  return (
    <>
      <div className="p-6 flex flex-col justify-center">
        <Image
          alt="Illustration of man sitting on a block"
          src="/contact.svg"
          width={129}
          height={150}
          layout="responsive"
        />
      </div>
      <div className="p-6 flex justify-center flex-col">
        <h2 className="mb-6 text-2xl">Drop me a message</h2>
        <form
          onSubmit={e => submitForm(e)}
          action="https://formspree.io/xzbgjqdq"
          method="POST"
        >
          <div className="flex flex-col mb-4">
            <label className="mb-3" htmlFor="email">
              Your e-mail
            </label>
            <input
              className="py-2 px-4 bg-white border-primary border-2 rounded-md"
              id="email"
              type="email"
              name="email"
              placeholder="info@example.com"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="my-2" htmlFor="message">
              Your message
            </label>
            <textarea
              className="py-2 px-4 bg-white border-primary border-2 rounded-md"
              rows="3"
              id="message"
              type="text"
              name="message"
              placeholder="Hey, I would like to get in touch with you"
              required
            />
          </div>

          <button
            className="px-8 mt-4 py-4 bg-primary text-white rounded-md"
            type="submit"
          >
            Submit
          </button>
          {formResult === 'error' && (
            <p className="error">Ooops! There was an error. Try again later.</p>
          )}
          {formResult === 'ok' && (
            <p className="success">
              I received your message. I'll get back to you ASAP.
            </p>
          )}
        </form>
      </div>
    </>
  )
}

export default Contact
