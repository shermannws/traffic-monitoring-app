import React, { useState, useRef } from "react"
import { Alert, Container, Card, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { db } from "../firebase"

export default function RegisterPage() {
  const nameRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)

      let currentTime = new Date()
      let currentHr = currentTime.getHours()
      console.log(currentHr)
      let dataDocRef = await db.collection("test").doc("test")
      dataDocRef.get().then((doc) => {
        let prev = doc.data().arr

        let newObject = JSON.parse(JSON.stringify(prev[currentHr]))
      
        newObject.actual = newObject.actual + 1
        
        let next = JSON.parse(JSON.stringify(prev))
        next.splice(currentHr,1,newObject)
  
        db.collection("test").doc("test").set({
          arr: next
        }, { merge: true })
  
      })
     
     
      history.push("/done")
    } catch {
      setLoading(false)
      setError("Failed to Register. Please Try Again")
    }
  }

  return (
    <>
      <Container
        className="w-100 d-flex align-items-start justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100">
          
          <Container className="d-flex align-items-start justify-content-center">
             <Card className="w-100"> 
              <Card.Body>

                <h4 className="text-center mb-4">Welcome to CAPT!</h4>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Register with your name" type="text" ref={nameRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">
                    Register Now!
                  </Button>
                </Form>

              </Card.Body>
            </Card>
          </Container>
          
          
        </div>  
      </Container>
    </>
  )
}