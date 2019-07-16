import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import DeleteNoteButton from './DeleteNoteButton'


describe('Delete Note Button Component', () => {

    const buttonProps = {
        noteId: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
    }

    it('renders without errors', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DeleteNoteButton />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('renders empty', () => {
        const tree = renderer.create(<DeleteNoteButton />).toJSON();
        expect(tree).toMatchSnapshot()
    })

    it('renders properly when given props', () => {
        const tree = renderer.create(<DeleteNoteButton noteId={buttonProps.noteId} />).toJSON();
        expect(tree).toMatchSnapshot()
    })

})