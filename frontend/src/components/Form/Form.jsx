/* eslint-disable linebreak-style */
import { useFormik } from 'formik';
import React from 'react';
import {
  Button, Checkbox, Label, Modal, TextInput,
} from 'flowbite-react';

function Form() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log('form data', values);
    },
  });
  return (

    <Modal
      show=""
      size="md"
      popup
      onClose=""
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Login
          </h3>
          <form action="" onSubmit={formik.handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                name="email"
                placeholder="mail@sample.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="/modal"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Forgot Password?
              </a>
            </div>
            <div className="w-full">
              <Button type="submit">Login</Button>
            </div>
          </form>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <p
              className="text-cyan-700 hover:underline cursor-pointer dark:text-cyan-500"
              onClick=""
            >
              Create account
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Form;
