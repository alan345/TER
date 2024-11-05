import React from "react"
import { z } from "zod"
import { trpc } from "../../../utils/trpc"
import { AppContext } from "../../../ContextProvider"
import { Link, useNavigate } from "react-router-dom"
import { zodSignup } from "@ter/shared/schemas/zod"

type SignupFormData = z.infer<typeof zodSignup>

export const Signup = () => {
  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const signupMutation = trpc.signup.useMutation({})
  const [formData, setFormData] = React.useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = React.useState<Partial<Record<keyof SignupFormData, string>>>({})
  const [touchedFields, setTouchedFields] = React.useState<Partial<Record<keyof SignupFormData, boolean>>>({})
  const [activeFields, setActiveFields] = React.useState<Partial<Record<keyof SignupFormData, boolean>>>({})
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const validateField = (fieldName: keyof SignupFormData, value: string) => {
    try {
      const fieldSchema = zodSignup.shape[fieldName]
      fieldSchema.parse(value)
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }))
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [fieldName]: error.errors[0].message }))
      }
      return false
    }
  }

  const isFormValid = () => {
    try {
      zodSignup.parse(formData)
      return true
    } catch {
      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setActiveFields((prev) => ({ ...prev, [name]: true }))
    validateField(name as keyof SignupFormData, value)
  }

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouchedFields((prev) => ({ ...prev, [name]: true }))
    setActiveFields((prev) => ({ ...prev, [name]: false }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await signupMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })
      context.updateUser()
      navigate("/profile")
    } catch (error) {
      setIsSubmitting(false)
      console.error("Submission error:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Sign up</h2>
      <form onSubmit={onSubmit} className="mt-4 space-y-2">
        <div>
          <input
            id="name-input"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`
              ${touchedFields.name && errors.name && !activeFields.name ? "input-error" : "input-default"} `}
            type="text"
            placeholder="Name"
          />
          {touchedFields.name && errors.name && !activeFields.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            id="email-input"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`
              ${touchedFields.email && errors.email && !activeFields.email ? "input-error" : "input-default"} `}
            type="text"
            placeholder="Email"
          />
          {touchedFields.email && errors.email && !activeFields.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            id="password-input"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`
                ${
                  touchedFields.password && errors.password && !activeFields.password ? "input-error" : "input-default"
                }`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          {touchedFields.password && errors.password && !activeFields.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <input
            type="checkbox"
            id="show-password-checkbox"
            name="show-password-checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          />
          <label htmlFor="show-password-checkbox" className="ml-2 cursor-pointer">
            Show Password
          </label>
        </div>

        <button type="submit" disabled={isSubmitting || !isFormValid()} className="btn-blue">
          {isSubmitting ? <span>Signing up...</span> : <span>Sign up</span>}
        </button>
        {signupMutation.error && <p className="text-red-600">{signupMutation.error.message}</p>}
      </form>
      <p className="text-sm mt-6">
        I have an account{" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </div>
  )
}
