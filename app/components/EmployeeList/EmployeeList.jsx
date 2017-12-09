import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Api from 'services/api';
import styleConf from './EmployeeList.styles';
import EmployeeCard from 'components/EmployeeCard/EmployeeCard';

const styles = StyleSheet.create(styleConf);

class EmployeeList extends React.Component {
    constructor() {
        super();

        this.state = {
            employees: [],
            status: ''
        };
    }

    async componentWillMount() {
        try {
            const employees = await Api.request({endpointName: 'getEmployees'});

            if (employees) {
                this.setState({ employees });
            } else {
                throw 'Could not fetch data';
            }
        } catch (err) {
            this.setState({ status: err });
        }
    }

    render() {
        return (
            <section>
                <h3 className={css(styles.title)}>Employee list (click on employee card to edit)</h3>
                <nav className={css(styles.nav)}>
                    <Link to="/new">
                        <button>Add employee</button>
                    </Link>
                </nav>
                <div className={css(styles.list)}>
                    {this.state.employees.map(employee => <EmployeeCard key={employee.slug} data={employee} />)}
                </div>
                <p>{this.state.status}</p>
            </section>
        );
    }
}

export default EmployeeList;