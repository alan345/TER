import React from "react"
import { trpc } from "../../utils/trpc"
import { AppContext } from "../../ContextProvider"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { zod } from "@ter/shared/schemas/zod"
import ErrorMutation from "../../layout/ErrorMutation"
const zodSignup = zod.zodSignup
type SignupFormData = z.infer<typeof zodSignup>
type ErrorsType = Partial<Record<keyof SignupFormData, string[]>>

const Signup = () => {
  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const mutation = trpc.signup.useMutation({})
  const [formData, setFormData] = React.useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = React.useState<ErrorsType>({})
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
        const fieldErrors = error.errors.map((err) => err.message)
        setErrors((prev) => ({ ...prev, [fieldName]: fieldErrors }))
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
    setActiveFields((prev) => ({ ...prev, [name]: false }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await mutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })
      context.updateAuth()
      navigate("/profile")
    } catch (error) {
      setIsSubmitting(false)
      console.error("Submission error:", error)
    }
  }

  return (
    <div className="p-6">
      <h1>Sign up</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-2">
        <div>
          <input
            id="name-input"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={errors.name && !activeFields.name ? "input-error" : "input-default"}
            type="text"
            placeholder="Name"
          />
          {!activeFields.name &&
            errors.name?.map((error, idx) => (
              <p key={idx} className="mt-1 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>

        <div>
          <input
            id="email-input"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={errors.email && !activeFields.email ? "input-error" : "input-default"}
            type="text"
            placeholder="Email"
          />
          {!activeFields.email &&
            errors.email?.map((error, idx) => (
              <p key={idx} className="mt-1 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>

        <div>
          <input
            id="password-input"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={errors.password && !activeFields.password ? "input-error" : "input-default"}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          {errors.password?.map((error, idx) => (
            <p key={idx} className="mt-1 text-sm text-red-500">
              {error}
            </p>
          ))}
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
        {mutation.error && <ErrorMutation data={mutation.error} />}
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

export default Signup
