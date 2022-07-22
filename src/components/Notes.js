import React, { useContext,useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import {Link, useNavigate} from "react-router-dom";

const Notes = (props)=>{
    const context = useContext(noteContext);
    const {notes,editNote,getNotes} = context;
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
    },[])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote] = useState({id: "", etitle : "", edescription : "", etag : ""});

    const updateClick = (e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("success","Note Updated Successfully!")
    }

    const handleChange = (e) =>{
        setNote({...note, [e.target.name] : e.target.value});
    }

   // update note
   const updateNote = (currentNote)=>{
        // to toggle modal.
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    return(
        <div className="row">
            <div>
            {/*  Edit Modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form id="create-note">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter Title...." onChange={handleChange} value={note.etitle}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="edescription" name="edescription" rows="3" placeholder="Enter Description...." onChange={handleChange} value={note.edescription}></textarea>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="tag" className="form-label">Category Tag</label>
                            <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter Category Tag...." onChange={handleChange} value={note.etag}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-danger text-uppercase btn-sm" data-bs-dismiss="modal"><i className="fa-solid fa-xmark"></i> Close</button>
                    <button type="button" className="btn btn-success text-uppercase btn-sm" onClick={updateClick}><i className="fa-solid fa-download"></i> Update Note</button>
                </div>
                </div>
            </div>
            </div>
            <h3 className="text-info text-uppercase">All Notes</h3>
            <Link to="/create-note" className="btn btn-primary btn-sm text-uppercase float-end" type='button'><i className="fa-solid fa-plus"></i> Create Note</Link>
            {notes.length === 0 && <p className='lead py-5 text-danger fw-normal'><i className="fa-solid fa-face-frown"></i> No Notes Available</p>}
            </div>
            {notes.map((note)=>{
                return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/> 
            })}
        </div>
    )
}
export default Notes;