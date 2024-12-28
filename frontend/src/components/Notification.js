const Notification = ({ message, errorMsg }) => {
    if (message && errorMsg === null) {
      return null
    }
  
    return (
      <>
      
      {message && <div className='success'>
        {message}
      </div>}
      {errorMsg && <div className="error">
        {errorMsg}
      </div>}
      </>
    )
  }

export default Notification  