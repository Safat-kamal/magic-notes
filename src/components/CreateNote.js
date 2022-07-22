import React,{useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';
import {useNavigate} from 'react-router';
const CreateNote = () => {
  const context = useContext(noteContext);
  const {addNote}  = context;
  const navigate = useNavigate();

  const [note,setNote] = useState({title : "", description : "", tag : ""});
  const creatClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title : "", description : "", tag : ""});
    navigate("/");
  }
  const handleChange = (e) =>{
      setNote({...note, [e.target.name] : e.target.value})
  }
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8 col-11 mx-auto">
            <div className="shadow rounded px-4 py-5 bg-primary text-white">
            <h3 className="text-light text-uppercase  mb-4">Create New Note</h3>
            <form id="create-note">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Enter Title...." value={note.title} onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3" placeholder="Enter Description...." value={note.description} onChange={handleChange}></textarea>
              </div>
              <div className="mb-5">
                <label htmlFor="tag" className="form-label">Category Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Category Tag...." value={note.tag} onChange={handleChange}/>
              </div>
              <div>
                <button disabled={note.title.length === 0 || note.description.length === 0} className="btn btn-light btn-sm" type='submit' onClick={creatClick}><i className="fa-solid fa-plus"></i> CREATE</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNote
