
import { useState } from 'react'


const Diary = ({ diary, deleteDiary, user }) => {



  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const handleDelete = () => {
    deleteDiary(diary)
  }




  if (!showMoreInfo) {
    return (
      <div className="diary">
        <h3>{diary.title} <button onClick={() => setShowMoreInfo(true)}>Show</button></h3>

      </div>
    )
  }
  return (
    <div className="diary">
      <h3>{diary.title}, by {user.name} </h3>
      <p><strong>Author: </strong> {user.name} </p>
      <p><strong>Date: </strong> {new Date(diary.date).toString()} </p>
      <p> <strong>Entry:</strong> {diary.content} </p>
      <button onClick={handleDelete}>Remove entry</button>
    </div>

  )


}

export default Diary