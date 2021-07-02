import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'

export default function Message(props) {
    const [show, setShow] = useState(false)

  return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'relative',
          minHeight: '100px',
        }}
      >
      <Toast
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>  
      </div>
    )
}