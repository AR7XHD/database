import React, { useState } from 'react';
import { useRef,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// Simple card with three input boxes styled using Tailwind CSS.
// Simple card with heading and three input boxes styled using Tailwind CSS.
export default function Manager() {
    const passwordRef = useRef(null);
    const chaneref = useRef(null);
    const [AllForms, setAllForms] = useState([])
    
    const [Form, setForm] = useState({
        site: "",
        username: "",
        password: ""
    })


    const getpass = async () => {
      let res = await fetch("http://localhost:3000/")
      let data = await res.json()
      setAllForms(data)
      console.log(data);
    }



    useEffect(() => {
        getpass()
    }, [])




const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
}
    

    const changeicon = () => {
        if(passwordRef.current.src === "https://cdn.lordicon.com/dicvhxpz.json") {
            chaneref.current.type = "text";
            passwordRef.current.src = "https://cdn.lordicon.com/tdqzqztd.json";
        } else {
            chaneref.current.type = "password";
            passwordRef.current.src = "https://cdn.lordicon.com/dicvhxpz.json";
        }
        
    }

    const handlechange = (e) => {
        setForm({...Form, [e.target.name]: e.target.value})
        console.log(Form);
        
    }

    const Itemdelete = async (id) => {
        setAllForms(AllForms.filter(item => item.id !== id))

        await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        })
       
    
        toast.error('Password Deleted', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    
    }

    const Itemedit = (id) => {
        const item = AllForms.filter(item => item.id === id)[0];
        console.log(item);
        setForm({...item,id:id});
        console.log(Form);
        // Itemdelete(id);
        setAllForms(AllForms.filter(item => item.id !== id))  
        
    }


    const handleSubmit = async () => {
      if(Form.id){
        await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: Form.id}),
        })
      }
        const newForm = {...Form, id: uuidv4()};
        const newForms = [...AllForms, newForm];
        setAllForms(newForms);
       await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
       })

       setForm({
        site: "",
        username: "",
        password: ""
       })


        toast.success('Password Saved', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>  
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-gray-900 text-white rounded shadow">
      <h3 className="text-2xl font-bold mb-1 text-green-400">PassOP</h3>
      <p className="text-gray-300 mb-6">Your own Password Manager</p>

      <div className="space-y-4">
        <input
        onChange={handlechange}
        value={Form.site}
        name='site'
          type="text"
          placeholder="Site / URL"
          className="p-2 border border-green-500 bg-gray-800 text-white rounded placeholder-gray-400 focus:outline-none w-full"
        />
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
          onChange={handlechange}
          value={Form.username}
          name='username'
            type="text"
            placeholder="Username / Email"
            className="p-2 border border-green-500 bg-gray-800 text-white rounded placeholder-gray-400 focus:outline-none w-1/2"
          />
          <div className='relative w-1/2'>

          <input
          ref={chaneref}
          onChange={handlechange}
          value={Form.password}
          name='password'
            type="password"
            placeholder="Password"
            className="p-2 border border-green-500 bg-gray-800 text-white rounded placeholder-gray-400 focus:outline-none w-full"
            />
          <lord-icon
          ref = {passwordRef}
          onClick={changeicon}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
          colors="primary:#08a88a,secondary:#08a88a"
    src="https://cdn.lordicon.com/dicvhxpz.json"
    trigger="hover"
    style={{width: "25px", height: "25px"}}>
</lord-icon>
        </div>  
        </div>
      </div>
      <button
      onClick={handleSubmit}
        type="submit"
        className="mx-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mt-4"
      >
        <lord-icon
        colors="primary:#ffffff"
    src="https://cdn.lordicon.com/gzqofmcx.json"
    trigger="hover"
    >
</lord-icon>
        Save
      </button>
    </div>

    

    {AllForms.length == 0 && <div className="mt-8 text-center text-gray-400">No Passwords Found</div>}
    {AllForms.length > 0 && <div className="mt-8 overflow-x-auto">
      <table className="min-w-full bg-gray-900 text-white rounded-lg shadow-lg">
        <thead className="bg-gray-800 border-b border-green-500/20">
          <tr>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Site</th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Password</th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-500/20">
        {AllForms.map((form, index) => (
          <tr className="hover:bg-gray-800/50" key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{form.site}
                <svg className="w-4 h-4 ml-2 inline cursor-pointer hover:scale-110 transition-all" onClick={() => copy(form.site)} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect height="13" rx="2" ry="2" width="13" x="9" y="9"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
            </td>               
            <td className="px-6 py-4 whitespace-nowrap">{form.username}
                <svg className="w-4 h-4 ml-2 inline cursor-pointer hover:scale-110 transition-all" onClick={() => copy(form.username)} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect height="13" rx="2" ry="2" width="13" x="9" y="9"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{form.password}
                <svg className="w-4 h-4 ml-2 inline cursor-pointer hover:scale-110 transition-all" onClick={() => copy(form.password)} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect height="13" rx="2" ry="2" width="13" x="9" y="9"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => Itemedit(form.id)} className="text-green-400 hover:text-green-300">Edit</button>
              <button onClick={() => Itemdelete(form.id)} className="ml-2 text-red-400 hover:text-red-300">Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>}
    </>
  );
}
