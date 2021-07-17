import React, { useState, useRef } from "react"
import { Alert, Container, Card, Form, Button, Row } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { db } from "../firebase"
import firebase from "firebase/app"

export default function RegisterPage() {
  const roomRef = useRef("Floor")
  const unitRef = useRef("Unit")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const floors = ['03','04','05','06','07','08','09','10','11','12','13','14','15','16','17']
  const units = ['50A','50B','50C','50D','50E','50F','51','52','53','54','55','56','57','58','59','60A','60B','60C','60D','60E','60F','61A','61B','61C','61D','61E','61F','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76']

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)

      if (roomRef.current.value === "Floor") {
        throw new Error("1")
      }
      if (unitRef.current.value === "Unit") {
        throw new Error("2")
      }

      let currentTime = new Date()
      let currentHr = currentTime.getHours()

      // floors.forEach(async f => units.forEach(async u => {
      //   let room = f+u
      //   await db.collection("rooms").doc(room).set({
      //     count: 0
      //   }, { merge: true})
      // }))
      let room = roomRef.current.value + unitRef.current.value
      await db.collection("rooms").doc(room).update({
        count: firebase.firestore.FieldValue.increment(1)
      }, { merge: true})
      
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
    } catch (e) {
      setLoading(false)
      let msg
      if (e.message === "1") {
        msg = "Please select a valid floor."
      } else if (e.message === "2") {
        msg = "Please select a valid unit."
      } else {
        msg = "Plese try again."
      }
      setError(msg)
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
                  <Form.Group id="room-num">
                    <Form.Label>Register with your room number</Form.Label>
                    <Row className="ml-1">
                      <Form.Control className="w-50" as="select" ref={roomRef}>
                        <option disabled selected>Floor</option>
                        {floors.map(floor => { return (
                          <option value={floor}>{floor}</option>
                        )})}
                      </Form.Control>
                      <Form.Control className="w-50" as="select" ref={unitRef}>
                        <option disabled selected>Unit</option>
                        {units.map(unit => { return (
                          <option value={unit}>{unit}</option>
                        )})}
                      </Form.Control>
                    </Row>
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