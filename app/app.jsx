import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

import Api from 'services/api';
import EmployeeList from 'components/EmployeeList/EmployeeList';
import EmployeeEditor from 'components/EmployeeEditor/EmployeeEditor';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            employees: []
        };

        this.submitEmployee = this.submitEmployee.bind(this);
    }

    componentWillMount() {
        this.fetchEmployeeList();
    }

    async fetchEmployeeList() {
        const employees = await Api.request({endpointName: 'getEmployees'});

        this.setState({ employees });
    }

    async submitEmployee(formData) {
        const editExisting = !!formData.id;
        const endpointName = editExisting ? 'putEmployee' : 'postEmployee';

        try {
            const result = await Api.request({ endpointName }, formData);

            this.fetchEmployeeList();
        } catch (err) {
            console.error(err);
        }
    }

    getEmployeeBySlug(route) {
        const { slug } = route.match.params;
        const employee = this.state.employees.find(employee => employee.slug === slug);

        if (employee) {
            delete employee.slug;
        } else {
            console.error('Invalid employee slug');
        }

        return employee;
    }

    render() {
        return (
            <main>
                <h1>app</h1>

                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={() => <EmployeeList employees={this.state.employees} />} />
                        <Route path="/new" component={() => <EmployeeEditor submitHandler={this.submitEmployee} />} />
                        <Route path="/employee/:slug" component={route => <EmployeeEditor submitHandler={this.submitEmployee} employee={this.getEmployeeBySlug(route)} />} />
                    </Switch>
                </BrowserRouter>
            </main>
        )
    }
}

render(<App />, document.getElementById('app'));