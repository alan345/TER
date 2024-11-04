export const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-64">
      <h1 className="text-3xl font-bold text-center mb-4">Got Questions? Just Want to Chat? Find a Bug?</h1>
      <p className="text-lg text-center mb-4">Love this? Hate this? Can't decide? Either way, let me know!</p>

      <p className="text-md text-center mb-4">
        You can reach me at{" "}
        <a href="https://github.com/alan345/TER/issues" className="link">
          this magical link
        </a>
      </p>
      <p className=" text-gray-600 text-center">Also, please add a star! It helps!</p>
      <a
        href="https://github.com/alan345/TER"
        className="block py-2.5 px-4 rounded transition hover:bg-gray-100 mt-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="https://img.shields.io/github/stars/alan345/ter.svg" alt="GitHub" />
      </a>
    </div>
  )
}
