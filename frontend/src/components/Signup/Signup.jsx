import { Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react';

function Signup({ openModal, toggleModal }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <>
      <Modal
        show={openModal === "signup-form"}
        size="md"
        popup
        onClose={() => toggleModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Register
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fullName" value="Your full name" />
              </div>
              <TextInput
                id="fullName"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="mail@sample.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mobile" value="Your mobile" />
              </div>
              <TextInput
                id="mobile"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Confirm password" />
              </div>
              <TextInput
                id="confirmPass"
                type="password"
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
                required />
            </div>
            <div className="w-full">
              <Button>Signup</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered?&nbsp;
              <p
                className="text-cyan-700 hover:underline cursor-pointer dark:text-cyan-500 "
                onClick={() => toggleModal("login-form")}
              >
                Login to account
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Signup
