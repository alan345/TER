import levelpath from "../images/ter-logo.png";

type Props = {
  children: React.ReactNode;
};
const BackgroundPage = (props: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 ">
      <header className="text-center flex justify-center items-center p-10">
        <div>
          <img src={levelpath} alt="logo" className="object-center m-2 h-24" />
        </div>
      </header>
      <div className="mt-10 mx-10 pb-10">{props.children}</div>
    </div>
  );
};

export default BackgroundPage;