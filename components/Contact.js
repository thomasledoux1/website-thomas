import React, {useState} from 'react'
import Image from 'next/image'
import {
  faGithub,
  faLinkedin,
  faFacebook,
  faDev,
} from '@fortawesome/free-brands-svg-icons'
import SocialLink from './SocialLink'

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
      <div className="p-6 flex justify-center flex-col items-center">
        <Image
          alt="Illustration of man sitting on a block"
          src="/contact.svg"
          width={129}
          height={150}
          layout="responsive"
        />
      </div>
      <div className="p-6 flex justify-center flex-col">
        <h2 className="mb-6">Drop me a message</h2>
        <form
          onSubmit={e => submitForm(e)}
          action="https://formspree.io/xzbgjqdq"
          method="POST"
        >
          <div className="flex flex-col">
            <label className="mb-3" htmlFor="email">
              E-mail
            </label>
            <input
              className="py-2 px-4 bg-white border-darkPurple dark:border-orange border-2"
              id="email"
              type="email"
              name="email"
              placeholder="info@example.com"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="my-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="py-2 px-4 bg-white border-darkPurple dark:border-orange border-2"
              rows="3"
              id="message"
              type="text"
              name="message"
              placeholder="Hey, I would like to get in touch with you"
              required
            />
          </div>

          <button
            className="w-full mt-4 py-4 bg-darkPurple dark:bg-orange text-white dark:text-whitedarktheme"
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
      <div className="p-6 flex justify-center items-center flex-col">
        <h2 className="mb-6">You can also find me here</h2>
        <ul className="flex">
          <SocialLink
            label="linkedin"
            href="https://www.linkedin.com/in/thomasledoux91"
            fill="text-linkedIn"
            icon={faLinkedin}
          />
          <SocialLink
            label="github"
            href="https://github.com/thomasledoux1"
            icon={faGithub}
          />
          <SocialLink
            label="facebook"
            href="https://github.com/thomasledoux1"
            icon={faFacebook}
            fill="text-facebook"
          />
          <SocialLink
            label="dev.to"
            href="https://dev.to/thomasledoux1"
            icon={faDev}
            lastItem
          />
        </ul>
      </div>
    </>
  )
}

export default Contact
