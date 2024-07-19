import levelpath from "../images/logo-checkrpay.svg";

type Props = {
  children: React.ReactNode;
};
const BackgroundPage = (props: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#053F6D] via-[#0E6D89] to-[#172F4B] ">
      <header className="text-center flex justify-center items-center p-10">
        <h1 className="text-white text-4xl">ElderBolt</h1>
        <div className="mx-2" />
        by
        <div className="mx-1" />
        <div>
          <img src={levelpath} alt="logo" className="object-center m-2 h-3" />
        </div>
      </header>
      <div className="mt-10 mx-10 pb-10 text-white">{props.children}</div>
    </div>
  );
};

export default BackgroundPage;
