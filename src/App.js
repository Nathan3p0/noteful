import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import FolderListPrimary from './Components/FolderList/FolderListPrimary';
import NotesSidebar from './Components/NotesSidebar/NotesSidebar';
import NotesList from './Components/NotesList/NotesList';
import SingleNote from './Components/SingleNote/SingleNote';
import AddFolderForm from './Components/AddFolderForm/AddFolderForm';
import AddNoteForm from './Components/AddNoteForm/AddNoteForm';
import { NotefulContext } from './Components/NotefulContext';
import NotefulErrorPage from './Components/ErrorPages/NotefulErrorPage';
import Error404 from './Components/ErrorPages/Error404';
import NotesApiService from './services/notes-api-service';
import FoldersApiService from './services/folders-api-service';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      notes: [],
      currentNote: {},
      currentFolder: {},
      newNoteName: '',
      newNoteContent: '',
      folderName: '',
      currentNoteId: null
    }
  }

  componentDidMount() {
    this.fetchFolders();
    this.fetchNotes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentNoteId !== prevState.currentNoteId) {
      this.getFolderName(this.state.currentNoteId);
    }
  }


  /*
    * API Calls
  */

  fetchFolders = () => {
    NotesApiService.fetchFolders()
      .then(res =>
        this.setState({
          folders: res
        }))
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
  }

  fetchNotes = () => {
    NotesApiService.fetchNotes()
      .then(res => this.setState({
        notes: res
      }))
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  fetchSingleNote = (noteId) => {
    NotesApiService.fetchSingleNote(noteId)
      .then(res => {
        return res.name
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  fetchSingleFolder = (folderId) => {
    FoldersApiService.fetchSingleFolder(folderId)
      .then(responseJson => this.setState({
        currentFolder: responseJson
      }))
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  createFolder = (event) => {
    event.preventDefault()
    const newFolder = {
      name: this.state.newFolderName
    }

    FoldersApiService.createFolder(newFolder)
      .then(res => {
        this.setState({
          newFolderName: '',
          folders: [...this.state.folders, res]
        })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  createNote = (event) => {
    const newNote = {
      name: this.state.newNoteName,
      content: this.state.newNoteContent,
      folder_id: this.state.newNoteFolderId
    }

    NotesApiService.createNewNote(newNote)
      .then(res => {
        this.setState({
          notes: [...this.state.notes, res],
          newNoteName: '',
          newNoteContent: '',
          newNoteFolderId: ''
        })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  deleteNote = (noteID) => {
    NotesApiService.deleteNote(noteID)
      .then(res => {
        this.setState({
          notes: res
        })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  /*
    * Other Methods
  */

  updateFolder = (e) => {
    this.setState({
      newFolderName: e.target.value
    })
  }

  updateNote = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  getFolderName = (id) => {
    FoldersApiService.fetchNoteFolder(id)
      .then(res => {
        this.setState({
          folderName: res
        })
      })
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
  }

  getCurrentNote = (id) => {
    this.setState({
      currentNoteId: id
    })
  }

  render() {
    const error = this.state.error ? <div className='errorDisplay'>{this.state.error}</div> : '';
    const value = {
      deleteNote: (noteID) => this.deleteNote(noteID),
      updateFolder: this.updateFolder,
      createFolder: (event) => this.createFolder(event),
      newFolderName: this.state.newFolderName,
      newNoteName: this.state.newNoteName,
      newNoteContent: this.state.newNoteContent,
      newNoteFolderId: this.state.newNoteFolderId,
      updateNote: this.updateNote,
      createNote: (event) => this.createNote(event),
      folders: this.state.folders,
      notes: this.state.notes,
      folderName: this.state.folderName,
      getCurrentNote: this.getCurrentNote
    }

    return (
      <div className="App">
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <NotefulErrorPage>
          <NotefulContext.Provider value={value}>
            <nav className="notefulNav">
              <Switch>
                <Route exact path="/" component={FolderListPrimary} />
                <Route path="/folder/:folderid" component={FolderListPrimary} />
                <Route path="/note/:noteid" component={NotesSidebar} />
                <Route path="/addfolder" component={FolderListPrimary} />
                <Route path="/addnote" component={FolderListPrimary} />
              </Switch>
            </nav>
            <main className="notefulContent">
              {error}
              <Switch>
                <Route exact path="/" component={NotesList} />
                <Route path="/folder/:folderid" component={NotesList} />
                <Route path="/note/:noteid" render={(routerProps) => <SingleNote note={routerProps.match.params.noteid} />} />
                <Route path="/addfolder" component={AddFolderForm} />
                <Route path="/addnote" component={AddNoteForm} />
                <Route component={Error404} />
              </Switch>
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
