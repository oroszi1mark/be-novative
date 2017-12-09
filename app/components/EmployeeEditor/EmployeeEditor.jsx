import React from 'react';
import PropTypes from 'prop-types';
import RouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Api from 'services/api';
import styleConf from './EmployeeEditor.styles';

const styles = StyleSheet.create(styleConf);

class EmployeeEditor extends React.Component {
    constructor() {
        super();

        this.state = {
            formData: {
                firstName: '',
                lastName: '',
                email: ''
            },
            status: ''
        };
    }

    async componentWillMount() {
        if (this.props.slug) {
            const employee = await this.getEmployeeBySlug();

            delete employee.slug;
            this.setState({ formData: employee });
        }
    }

    async getEmployeeBySlug() {
        const { slug } = this.props;
        const endpointName = 'getEmployee';
        const pathParams = { slug };
        const employee = await Api.request({ endpointName, pathParams });

        if (employee) {
            delete employee.slug;
        } else {
            this.setState({ status: 'Invalid employee slug. Please return to the main page and try again.' });
        }

        return employee;
    }

    submitEmployee() {
        const payload = { ...this.state.formData };
        const editExisting = payload.id !== undefined;
        const endpointName = editExisting ? 'putEmployee' : 'postEmployee';

        this.callEndpoint(endpointName, { payload });
    }

    removeEmployee() {
        const endpointName = 'deleteEmployee';
        const { slug } = this.props;
        const pathParams = { slug };

        this.callEndpoint(endpointName, { pathParams });
    }

    async callEndpoint(endpointName, params = { pathParams: {}, payload: {} }) {
        const { pathParams, payload } = params;

        try {
            await Api.request({ endpointName, pathParams }, payload);
            this.props.history.push('/');
        } catch (err) {
            this.setState({ status: err });
        }
    }

    formInputHandler(e) {
        const { id, value } = e.target;

        this.setState({ formData: { ...this.state.formData, [id]: value } });
    }

    confirmRemove() {
        if (confirm('Confirm removing this employee from the database')) {
            this.removeEmployee();
        }
    }

    render() {
        const removeBtn = this.props.slug
            ? <button onClick={this.confirmRemove.bind(this)}>Remove employee</button>
            : '';

        return (
            <section>
                <form>
                    <div>
                        <label htmlFor="firstName" className={css(styles.label)}>First name</label>
                        <input
                            onChange={this.formInputHandler.bind(this)}
                            id="firstName"
                            value={this.state.formData.firstName}
                            className={css(styles.input)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className={css(styles.label)}>Last name</label>
                        <input
                            onChange={this.formInputHandler.bind(this)}
                            id="lastName"
                            value={this.state.formData.lastName}
                            className={css(styles.input)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className={css(styles.label)}>Email</label>
                        <input
                            onChange={this.formInputHandler.bind(this)}
                            id="email"
                            value={this.state.formData.email}
                            className={css(styles.input)}
                        />
                    </div>
                </form>
                <nav>
                    <Link to="/"><button>Cancel</button></Link>
                    {removeBtn}
                    <button onClick={this.submitEmployee.bind(this)}>Submit</button>
                </nav>
                <p>{this.state.status}</p>
            </section>
        )
    }
}

EmployeeEditor.propTypes = {
    slug: PropTypes.string,
    history: RouterPropTypes.history.isRequired
};

export default EmployeeEditor;