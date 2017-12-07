import React from 'react';
import { Link } from 'react-router-dom';

class EmployeeEditor extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        };
    }

    componentWillMount() {
        const stateWithProps = Object.assign({}, this.state, this.props.employee);

        this.setState({ ...stateWithProps });
    }

    submitClick() {
        const dataWithId = Object.assign({}, this.props.id, this.state);

        this.props.submitHandler(dataWithId);
    }

    formInputHandler(e) {
        const { id, value } = e.target;

        this.setState({ [id]: value });
    }

    render() {
        return (
            <section>
                <form>
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <input type="text" onChange={this.formInputHandler.bind(this)} id="firstName" value={this.state.firstName} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" onChange={this.formInputHandler.bind(this)} id="lastName" value={this.state.lastName} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" onChange={this.formInputHandler.bind(this)} id="email" value={this.state.email} />
                    </div>
                </form>
                <nav>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                    <button onClick={this.submitClick.bind(this)}>Submit</button>
                </nav>
            </section>
        )
    }
}

export default EmployeeEditor;