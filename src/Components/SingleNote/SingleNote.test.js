import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom';
import SingleNote from './SingleNote'


describe('Single Note Component', () => {

    const noteProps = {
        id: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Dogs",
        modified: "2019-01-03T00:00:00.000Z",
        content: "Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui."
    }

    it('renders without errors', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><SingleNote /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('renders empty given no note info', () => {
        const tree = renderer.create(
        <BrowserRouter>
            <SingleNote />
        </BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot()
    })
    
    it('renders properly when given props', () => {
        const tree = renderer.create(
        <BrowserRouter>
            <SingleNote note={noteProps} />
        </BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot()
    })

})