import Editor from './Editor'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    // const [image, setImage] = useState('')
    const [redirect, setRedirect] = useState(false)
    async function createNewPost(ev) {
        const data= new FormData();
        ev.preventDefault()
        data.append("title",title)
        data.append("summary",summary)
        data.append("content",content)
        // data.append("file",image)
        const response=await fetch("http://localhost:4000/posts", {
            method: "POST",
            body: data,
            credentials: "include"
        })
        if(response.ok){
            setRedirect(true)
        }
        
    }
    if(redirect){
        return <Navigate to={"/"}/>
    }
    // function convertToBase64(e) {
    //     const file = e.target.files[0]
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = () => {
    //         setImage(reader.result)
    //     }       
    // }

    return (
        <form className='min-h-screen flex flex-col justify-start gap-3' onSubmit={createNewPost}>
            <h1 className='text-2xl font-bold'>Create Post</h1>
       
            <input type="title" placeholder={'Title'} className='' value={title} onChange={ev=>setTitle(ev.target.value)}/>
            <input type="summary" placeholder={'Summary'} className='' value={summary} onChange={ev=>setSummary(ev.target.value)}/>
            {/* <input type="file" onChange={convertToBase64}/>
            {image==='' || image==null ?" ":<img src={image} alt=""/>} */}
            <Editor value={content} onChange={setContent}/>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create Post</button>
        </form>
         
    )
}
