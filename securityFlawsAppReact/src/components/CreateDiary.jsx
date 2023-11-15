import { useState } from 'react'


const CreateDiary = ({ createNewDiary }) => {
  const [newd, setNewD] = useState({
    title: '',
    content: '',
    date: '',
    user: null
  })

  const handleCreation = (event) => {
    event.preventDefault()

    const newdObject = {
      title: newd.title,
      content: newd.author,
      date: newd.date,
    }
    createNewDiary(newdObject)

    setNewD({
        title: '',
        content: '',
        date: '',
        user: null
    })
  }



  const handleDChange = (event) => {
    setNewD({
      ...newd, [event.target.name]: event.target.value
    })
  }

  return (
    <form onSubmit={handleCreation}>
      <div>
        <h2>Create a new blog</h2>
        <p>Title: <input id='title-input' type="text" value={newd.title} name="title" onChange={handleDChange}/></p>
        <p>Content: <input id='author-input' type="text" value={newd.author} name="author" onChange={handleDChange}/></p>
        <p>Date: <input id='url-input' type="text" value={newd.url} name="url" onChange={handleDChange}/></p>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default CreateDiary