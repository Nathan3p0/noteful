import config from '../config';

const FoldersApiService = {
    createFolder(folder) {
        return fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    },
    fetchSingleFolder(id) {
        return fetch(`${config.API_ENDPOINT}/folders/${id}`)
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    },
    fetchNoteFolder(id) {
        return fetch(`${config.API_ENDPOINT}/folders/folder/${id}`)
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    }
}

export default FoldersApiService;