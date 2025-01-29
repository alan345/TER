import logoApp from "@fsb/client/src/assets/images/logo-saas-transparent.png"

const LogoApp = () => {
  return (
    <div>
      <div className="flex justify-center mt-4">
        <img src={logoApp} alt="logo" className="w-24" />
      </div>
      <div className="flex  justify-center mt-2">
        <b className="text-sm">Fullstack SaaS Boilerplate</b>
      </div>
    </div>
  )
}
export default LogoApp
