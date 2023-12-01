import { useRef, useState } from 'react'


const CreateDiary = ({ createNewDiary }) => {
  const [title, setTitleValue] = useState('')
  const [content, setContentValue] = useState('')
  const date = new Date().toISOString()
  const divRef = useRef(null);


  const handleCreation = (event) => {
    event.preventDefault()

    const newdObject = {
      title: title,
      content: content,
      date: date,
    }
    createNewDiary(newdObject)

  setTitleValue('')
  setContentValue('')

  }


  // const handleDChange = (event) => {
  //   setNewD({
  //     ...newd, [event.target.name]: event.target.value
  //   })
  // }

  return (
    <><form onSubmit={handleCreation}>
      <div>
        <h2>Create a new blog</h2>
        <p>Title: <input id='title-input' type="text" value={title} name="title" onChange={(e) => setTitleValue(e.target.value)} /></p>
        <p>Content: <input id='author-input' type="text" value={content} name="author" onChange={(e) => setContentValue(e.target.value)} /></p>
      </div>
      {/* <button type="submit">Save</button> */}
      <button onClick={() => {
        divRef.current.innerHTML = title.concat(content)
      } }> Submit </button>
    </form><div ref={divRef}>

      </div></>
  )
}

export default CreateDiary