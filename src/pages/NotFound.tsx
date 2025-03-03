import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='text-5xl flex flex-col'>
      Not Found
      <button className="btn btn-primary mt-5 w-1/4 mx-auto" onClick={(e) => {navigate('/')}} >Home</button>
    </div>
  )
}

export default NotFound