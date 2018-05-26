import{ Component } from 'react';

export default class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingText: 'loading .'
        }
    }

    componentDidMount() {
        this.intervalId = window.setInterval(
            this.setLoadingText.bind(this)
            , 100);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    setLoadingText = () => {
        if (this.state.loadingText === 'loading ...') {
            this.setState({
                loadingText: 'loading .'
            })
        }
        else {
            this.setState({
                loadingText: this.state.loadingText + '.'
            })
        }
    }

    render() {
        return this.state.loadingText;
    }
}

