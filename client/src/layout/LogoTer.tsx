import logoTer from "@ter/client/src/assets/images/logo-saas-transparent.png"

const LogoTer = () => {
  return (
    <div className="p-4 flex items-center justify-center h-24 ">
      <div>
        <img src={logoTer} alt="logo" className="w-24" />
        Fullstack-SaaS-Boilerplate
      </div>
    </div>
  )
}
export default LogoTer
