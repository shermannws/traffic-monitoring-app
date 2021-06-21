import React from "react"
import { Image } from "react-bootstrap"
import insta from "../images/instagram-logo.png"

export default function RegisterPage() {

  return (
    <>
      <h4 className="text-center">
        Thank you for your response!
      </h4>
      <p className="text-center">
        Follow us now 
      </p>

      <div className="d-flex align-items-center justify-content-center">
        <Image className="mr-2" src={insta} width={80} />
        <span className="ml-2"><h4><a href="https://instagram.com/captsocialinnovation">@capt.si</a></h4></span>
      </div>

    </>
  )
}