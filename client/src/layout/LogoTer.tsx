import logoTer from "@ter/client/src/assets/images/ter-logo.png"

const LogoTer = () => {
  return (
    <div className="p-4 flex items-center justify-center h-24 ">
      <div>
        <img src={logoTer} alt="logo" className="w-24" />
        <b>T</b>rpc <b>E</b>xpress <b>R</b>eact
      </div>
    </div>
  )
}
export default LogoTer
