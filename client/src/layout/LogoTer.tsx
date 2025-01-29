import logoTer from "@ter/client/src/assets/images/logo-saas-transparent.png"

const LogoTer = () => {
  return (
    <div className="p-4 flex items-center justify-center h-24 ">
      <div>
        <img src={logoTer} alt="logo" className="w-24" />
        <b className="">Fullstack SaaS Boilerplate</b>
      </div>
    </div>
  )
}
export default LogoTer
