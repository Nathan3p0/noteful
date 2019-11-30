import config from '../config';

const NotesApiService = {
    createNewNote(note) {
        return fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        )
    },
    fetchFolders() {
        return fetch(`${config.API_ENDPOINT}/folders`)
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    },
    fetchNotes() {
        return fetch(`${config.API_ENDPOINT}/notes`)
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    },
    fetchSingleNote(id) {
        return fetch(`${config.API_ENDPOINT}/notes/${id}`)
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    },
    deleteNote(id) {
        return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
            method: 'DELETE',
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    }
}

export default NotesApiService