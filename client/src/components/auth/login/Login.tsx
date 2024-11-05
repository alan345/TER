import React from "react"
import { Link } from "react-router-dom"
import { trpc } from "../../../utils/trpc"
import { AppContext } from "../../../ContextProvider"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { zod } from "@ter/shared/schemas/zod"

type LoginFormData = z.infer<typeof zod.zodLogin>
type ErrorsType = Partial<Record<keyof LoginFormData, string[]>>

export const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<ErrorsType>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [activeFields, setActiveFields] = React.useState<Partial<Record<keyof LoginFormData, boolean>>>({})
  const [formData, setFormData] = React.useState<LoginFormData>({
    password: "securePassword",
    email: "alan@example.com",
  })

  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const loginMutation = trpc.login.useMutation({})
  const login = async () => {
    // e.preventDefault()
    setIsSubmitting(true)
    try {
      await loginMutation.mutateAsync({ email: formData.email, password: formData.password })
      context.updateUser()
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  }

  const validateField = (fieldName: keyof LoginFormData, value: string) => {
    try {
      const fieldSchema = zod.zodLogin.shape[fieldName]
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
      zod.zodLogin.parse(formData)
      return true
    } catch {
      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setActiveFields((prev) => ({ ...prev, [name]: true }))
    validateField(name as keyof LoginFormData, value)
  }

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setActiveFields((prev) => ({ ...prev, [name]: false }))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
      <div className="mt-4">
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
        <div className="mt-1">
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
          {!activeFields.password &&
            errors.password?.map((error, idx) => (
              <p key={idx} className="mt-1 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
        <div className="mt-2">
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
        <div className="mt-4">
          <div>
            <button
              id="email-mutation-button"
              disabled={isSubmitting || !isFormValid()}
              // disabled={loginMutation.isPending || email === "" || password === ""}
              onClick={login}
              className="btn-blue"
            >
              {loginMutation.isPending ? "Loading..." : "Login"}
            </button>
            {loginMutation.error && <p className="text-red-600">{loginMutation.error.message}</p>}
          </div>
        </div>
        <p className="text-sm mt-6">
          Don’t have an account yet?{" "}
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
