import { useState, useRef, useEffect } from "react"

function App() {
  const [modalOpen, setModalOpen] = useState(true)

  const inputRef = useRef(null)

  const [focusPoint, setFocusPoint] = useState(() => {
    let savedValue = localStorage.getItem('focusPoint')
    return savedValue ? JSON.parse(savedValue) : 'Click to change...'
  })

  function handleChange(e) {
    e.preventDefault()
    inputRef.current.value ? setFocusPoint(inputRef.current.value) : 'Set a Value'
    setModalOpen(!modalOpen)
  }

  window.addEventListener('storage', () => {
    setFocusPoint(JSON.parse(localStorage.getItem('focusPoint')) || [])
  })

  useEffect(() => {
    localStorage.setItem('focusPoint', JSON.stringify(focusPoint))
    console.log(focusPoint)
    inputRef.current.value = ""
  }, [focusPoint])

  return (
    <div className="flex flex-col gap-6 justify-center place-items-center text-white text-8xl h-screen relative bg-black">
      <h1 className="text-2xl">Current Focus:</h1>
      <p onClick={() => setModalOpen(!modalOpen)} className="cursor-pointer text-red-800">{focusPoint}</p>


      <div className={`${modalOpen ? 'block' : 'hidden'} text-6xl bg-black absolute h-3/4 w-3/4 text-red-800 flex flex-col justify-center place-items-center border-2 border-white rounded-xl`}>
        <form action="" onSubmit={(e) => { handleChange(e) }} className="flex-col gap-4 place-items-center justify-center">
          <label htmlFor="input">Set Focus Point:</label>
          <input type="text" ref={inputRef} id="input" name="input" placeholder="Change me..." className="block mt-4 mb-8 py-2 px-4 rounded-lg bg-black border-2 border-white" />
        </form>
        <p className="underline absolute top-6 right-6 text-red-800 text-2xl cursor-pointer" onClick={() => { setModalOpen(!modalOpen) }}>CLOSE</p>
      </div>
    </div>
  )
}

export default App
