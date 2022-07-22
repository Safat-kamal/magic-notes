import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;
    return (
        <div className='col-md-4 col-11 mx-md-0 mx-auto my-3'>
            <div className="card text-white bg-primary mb-3 shadow-lg">
                <div className="card-header">{note.tag}</div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2 bg-warning border border-warning rounded-circle p-2" onClick={()=>{updateNote(note)}}></i> <i className="fa-solid fa-trash-can mx-2 bg-danger border border-danger rounded-circle p-2" onClick={()=>{deleteNote(note._id);props.showAlert("success","Note Deleted Successfully!")}}></i>
                </div>
            </div>
        </div>
    )
}