import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import FolderListPrimary from './Components/NoteListNav/FolderListPrimary';
import NotesSidebar from './Components/NotePageNav/NotesSidebar';
import NotesList from './Components/NoteListMain/NotesList';
import SingleNote from './Components/NotePageMain/SingleNote';
import AddFolder from './Components/AddFolder/AddFolder';
import AddNote from './Components/AddNote/AddNote';
import { NotefulContext } from './Components/NotefulContext';
import NotefulErrorPage from './Components/ErrorPages/NotefulErrorPage';
import Error404 from './Components/ErrorPages/Error404';
import { withRouter } from 'react-router-dom'

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
      noFolderSelected: false
    }
  }

  componentDidMount() {
    this.fetchFolders();
    this.fetchNotes();
  }

  /*
    * API Calls
  */

  fetchFolders = () => {
    fetch('http://localhost:9090/folders')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.');
      })
      .then(responseJson => this.setState({
        folders: responseJson
      }))
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  fetchNotes = () => {
    fetch('http://localhost:9090/notes')
      .then(response => {
        if (response.ok) {
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
    fetch('http://localhost:9090/folders/', {
      method: 'POST',
      body: JSON.stringify({ name: this.state.newFolderName }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.ok) {
        this.setState({
          error: ''
        })
        return response.json()
      }
      throw new Error('Network response was not ok.');
    })
      .then(() => {
        this.fetchFolders()
        this.props.history.push('/');
        this.setState({ newFolderName: '' })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  createNote = (event) => {
    const date = new Date();
    event.preventDefault();
    if (this.state.newNoteFolderId.length > 0) {
      fetch('http://localhost:9090/notes/', {
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
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.');
      })
        .then(() => {
          this.fetchNotes()
          this.props.history.push('/');
          this.setState({
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
    } else {
      this.setState({
        noFolderSelected: true
      })
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
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => {
        this.fetchNotes();
        this.props.history.push('/');
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

  findNote = (noteId) => {
    return this.state.notes.find(note => note.id === noteId);
  }

  findNoteFolder = (noteId) => {
    const folderId = this.findNote(noteId);
    return this.state.folders.find(folder => folder.id === folderId);
  }

  findFolderNotes = (folderID) => {
    return this.state.notes.filter(note => note.folderId === folderID);
  }

  render() {
    const error = this.state.error ? <div className='errorDisplay'>{this.state.error}</div> : '';

    return (
      <div className="App">
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <NotefulContext.Provider value={this.state}>
          <NotefulErrorPage>
            <nav className="notefulNav">
              <Switch>
                <Route exact path="/" render={() => <FolderListPrimary folders={this.state.folders} />} />
                <Route path="/folder/:folderid" render={() => <FolderListPrimary folders={this.state.folders} />} />
                <Route path="/note/:noteid" component={NotesSidebar} />
                <Route path="/addfolder" component={FolderListPrimary} />
                <Route path="/addnote" component={FolderListPrimary} />
              </Switch>
            </nav>
          </NotefulErrorPage>
          <NotefulErrorPage>
            <main className="notefulContent">
              {error}
              <Switch>
                <Route exact path="/" render={() => <NotesList notes={this.state.notes} />} />
                <Route path="/folder/:folderid" render={(routerProps) => <NotesList notes={this.findFolderNotes(routerProps.match.params.folderid)} />} />
                <Route path="/note/:noteid" render={(routerProps) => <SingleNote note={this.findNote(routerProps.match.params.noteid)} />} />
                <Route path="/addfolder" render={() => <AddFolder />} />
                <Route path="/addnote" render={() => <AddNote />} />
                <Route component={Error404} />
              </Switch>
            </main>
          </NotefulErrorPage>
        </NotefulContext.Provider>

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

export default withRouter(App);
