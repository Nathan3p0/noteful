import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import NotesSidebar from './NotesSidebar'


describe('Notes Sidebar Component', () => {

    const sidebarProps = {
        goBack : () => {},
        folder: 'Spangley'
    }

    it('renders without errors', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NotesSidebar />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('renders empty given no note info', () => {
        const tree = renderer.create(<NotesSidebar />).toJSON();
        expect(tree).toMatchSnapshot()
    })
    
    it('renders properly when given props', () => {
        const tree = renderer.create(<NotesSidebar goBack={sidebarProps.goBack} folder={sidebarProps.folder}/>).toJSON();
        expect(tree).toMatchSnapshot()
    })

})