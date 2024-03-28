import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);


  const passwordGenerator =useCallback(()=>{
  let pass = "";
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+='0123456789'
    if(charAllowed) str+='!@#$%^&*-_=+[]{}~`';
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
      
    }
    setPassword(pass);
  }, [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg text-orange-500 bg-gray-800 py-8 my-8 px-4 '>
     <h1 className='text-2xl text-center text-white my-2' >Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none w-full py-2 px-3' placeholder='password'ref={passwordRef} readOnly />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-black text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={100} value={length} className='cursor-pointer text-black' onChange={(e) => {setLength(e.target.value)}} />
          <label className=' text-xl'>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"  onChange={() => {setNumberAllowed(prev => !prev)}} />
          <label className=' text-xl'>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"  onChange={() => {setCharAllowed(prev => !prev)}} />
          <label className=' text-xl'>Characters</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
