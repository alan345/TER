import levelpath from "../images/ter-logo.png"

export const LogoTer = () => {
  return (
    <div className="p-4 flex items-center justify-center h-24 ">
      <div>
        <a href="https://github.com/alan345/TER" target="_blank" rel="noopener noreferrer">
          <img src={levelpath} alt="logo" className="w-24" />
          <b>T</b>rpc <b>E</b>xpress <b>R</b>eact
        </a>
      </div>
    </div>
  )
}
