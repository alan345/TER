export const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-64">
      <h1 className="text-3xl font-bold text-center mb-4">Got Questions? Or Just Want to Chat?</h1>
      <p className="text-lg text-center mb-4">Love this? Hate this? Can't decide? Either way, let me know!</p>
      {/* <img
        src="https://source.unsplash.com/600x400/?funny"
        alt="Funny meme"
        className="mb-4 rounded shadow-lg"
      /> */}
      <p className="text-md text-center mb-4">
        You can reach me at{" "}
        <a href="https://github.com/alan345/TER/issues" className="text-blue-500 underline hover:text-blue-700">
          this magical link
        </a>
        . Or just shout really loud, I might hear you!
      </p>
      <p className="text-sm text-gray-600 text-center">
        (Disclaimer: Shouting may not yield a response, but I appreciate the enthusiasm!)
      </p>

      <p className="text-sm text-gray-600 text-center mt-10">Genreated by Chat GPT 4o mini</p>
    </div>
  )
}
