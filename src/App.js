import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import FolderListPrimary from './Components/NoteListNav/FolderListPrimary';
import NotesSidebar from './Components/NotePageNav/NotesSidebar';
import NotesList from './Components/NoteListMain/NotesList';
import SingleNote from './Components/NotePageMain/SingleNote';
import AddFolder from './Components/AddFolder/AddFolder';
import AddNote from './Components/AddNote/AddNote';
import { NotefulContext} from './Components/NotefulContext';
import NotefulErrorPage from './Components/ErrorPages/NotefulErrorPage';
import Error404 from './Components/ErrorPages/Error404';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      notes: [],
      deleteNote: (noteID) => this.deleteNote(noteID),
      updateFolder: (folderName) => this.updateFolder(folderName),
      createFolder: (event) => this.createFolder(event),
      newFolderName: '',
      newNoteName: '',
      newNoteContent: '',
      newNoteFolderId: '',
      updateNote: (event) => this.updateNote(event),
      createNote: (event) => this.createNote(event),
    }
  }

  deleteNote = (noteID) => {
    fetch(`http://localhost:9090/notes/${noteID}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.');
    })
    .then(responseJson => this.fetchNotes())
    .catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  componentDidMount() {
    this.fetchFolders();
    this.fetchNotes();
  }

  fetchFolders = () => {
    fetch('http://localhost:9090/folders')
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.');
    })
    .then(responseJson => this.setState({
        folders: responseJson
    }) )
    .catch(error => {
      this.setState({
        error: error.message
      })
    })
  }
  
  fetchNotes = () => {
    fetch('http://localhost:9090/notes')
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.');
    })
    .then(responseJson => this.setState({
        notes: responseJson
      }))
    .catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  createFolder = (event) => {
    event.preventDefault()
    fetch('http://localhost:9090/folders/',{
        method: 'POST',
        body: JSON.stringify({name: this.state.newFolderName}),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.');
    })
    .then(response => {
      this.fetchFolders()
      this.setState({newFolderName: ''})
    })
    .catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  updateFolder = (folderName) => {
    this.setState({
        newFolderName: folderName
    })
}

  updateNote = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
    [name]: value
    });
  }

  createNote = (event) => {
    const date = new Date();
    event.preventDefault()
    fetch('http://localhost:9090/notes/',{
        method: 'POST',
        body: JSON.stringify({
          name: this.state.newNoteName,
          content: this.state.newNoteContent,
          folderId: this.state.newNoteFolderId,
          modified: date
        }),
        headers: {
            'Content-Type': 'application/json',
          }
    }).then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.');
    })
    .then(response => {this.fetchNotes()
    this.setState({
      newNoteName: '',
      newNoteContent: '',
      newNoteFolderId: ''
    })})
    .catch(error => {
      this.setState({
        error: error.message
      })
    })
}

  findNote = (noteId) => {
    return this.state.notes.find(note => note.id === noteId);
  }

  findNoteFolder = (noteId) => {
      const folderId = this.findNote(noteId).folderId;
      return this.state.folders.find(folder => folder.id === folderId);
  }

  findFolderNotes = (folderID) => {
    return this.state.notes.filter(note => note.folderId === folderID);
  }

  render() {
    const error = this.state.error ? <div className='errorDisplay'>{this.state.error}</div> : '';

    return (
      <div className="App">
        <Header />
        <NotefulErrorPage>
            <NotefulContext.Provider
                  value={this.state}>
              <nav className="notefulNav">
                <Switch>
                  <Route exact path="/" render={() => <FolderListPrimary folders={this.state.folders} />} />
                  <Route path="/folder/:folderid" render={() => <FolderListPrimary folders={this.state.folders} />} />
                  <Route path="/note/:noteid" render={(routerProps) => <NotesSidebar folder={this.findNoteFolder(routerProps.match.params.noteid).name} goBack={() => routerProps.history.goBack()}   />} />
                  <Route path="/addfolder" render={() => <FolderListPrimary folders={this.state.folders} />} />
                  <Route path="/addnote" render={() => <FolderListPrimary folders={this.state.folders} />} />
                </Switch>
              </nav>
              <main>
              <section className="notefulContent">
              {error}
              <Switch>
                  <Route exact path="/" render={() => <NotesList notes={this.state.notes} />} />
                  <Route path="/addnote" render={() => <AddNote  /> } />
                  <Route path="/addfolder" render={() => <AddFolder /> } />
                  <Route path="/folder/:folderid" render={(routerProps) => <NotesList notes={this.findFolderNotes(routerProps.match.params.folderid)}  />} />
                  <Route path="/note/:noteid" render={(routerProps) => <SingleNote note={this.findNote(routerProps.match.params.noteid)}   />} />
                  <Route component={Error404} />
              </Switch>
              </section>
          </main>
            </NotefulContext.Provider>
        </NotefulErrorPage>
      </div>
    );
  }
}

App.defaultProps = {
  store: {
    folders: [{}],
    notes: [{}]
  }
}

export default App;
