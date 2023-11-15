const Notification =({ message, type }) => {
    if(message === null){
      return null
    }
    if(type === 'error') {
      console.log("ERROR")
      const notiElement = document.getElementById('notiId')
      console.log(notiElement)
      const notiMessage = `${message}`
      notiElement.append(notiMessage)
    }
    console.log('ILMOITUS VIESTI : ', message)
    const style = {
      color: type==='error' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 3,
      padding: 5,
      marginBottom: 10
    }
  
    return (
      <div style={style} id="notification">

      </div>
    )
    // return (
    //   <div id="notification" style={style}>
    //     {message}
    //   </div>
    // )
  
  
  }
  
  
  
  
  
  
  
  export default Notification