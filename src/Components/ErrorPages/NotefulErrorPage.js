import React, { Component } from 'react';

class NotefulErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false }
    }

    static getDerivedStateFromError(error) {
        return {
            error: true
        }
    }

    render() {
        if (this.state.error) {
            return (
                <main className='errorDisplay'>
                    <h1>Oooops!!! Something went wrong...</h1>
                    <p>Dang gerbils have stopped running again! Someone has been dispatched to poke them with a sharp stick.</p>
                </main>
            );
        }
        return this.props.children
    }
}

export default NotefulErrorPage;