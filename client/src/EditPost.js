import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "./Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const files = null;
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/posts/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('file', files);
    const response = await fetch('http://localhost:4000/posts/'+id, { 
      method: 'PUT',
      body: data,
      credentials: 'include'
    });
    if (response.ok) {
      setRedirect(true);
    }
  }


  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return ( 
    <div className="h-screen">
    <div className="">
    <form onSubmit={updatePost} className="flex flex-col justify-start gap-4">
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      {/* <input type="file"
             onChange={ev => setFiles(ev.target.files)} /> */}
      <Editor onChange={setContent} value={content} />
      <button className="w-full bg-blue-200">Update post</button>
    </form>
    </div>
    </div>
  );
}