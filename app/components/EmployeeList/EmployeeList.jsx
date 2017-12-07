import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import styleConf from './EmployeeList.styles';
import EmployeeCard from 'components/EmployeeCard/EmployeeCard';

const styles = StyleSheet.create(styleConf);

function EmployeeList(props) {
    return (
        <section>
            <h3 className={css(styles.title)}>Employee list (click on employee card to edit)</h3>
            <nav className={css(styles.nav)}>
                <Link to="/new">
                    <button>Add employee</button>
                </Link>
            </nav>
            <div className={css(styles.list)}>
                {props.employees.map(employee => <EmployeeCard key={employee.id} data={employee} />)}
            </div>
        </section>
    );
}

export default EmployeeList;