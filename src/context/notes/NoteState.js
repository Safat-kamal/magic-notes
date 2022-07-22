import React,{ useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props)=>{
    const host = "https://magic---notes.herokuapp.com";
    const InitialNotes = [];
    const [notes,setNotes] = useState(InitialNotes);
    
    // get all the notes
    const getNotes = async ()=>{
      // API CALL
      const url = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setNotes(json);
    }
    
    // Add a note
    const addNote= async (title,description,tag)=>{
      // API CALL
      const url = `${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    }

    // delete a note
    const deleteNote = async (id)=>{
      // API CALL
      const url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      // eslint-disable-next-line
      const json = await response.json();
      // filter deleted notes
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes);

    }
    
    // edit a note
    const editNote = async (id,title,description,tag) =>{
      // API CALL
      const url = `${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      // eslint-disable-next-line
      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes));

      // logic to set update value.
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }
      
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;