import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import styleConf from './EmployeeCard.styles';

const styles = StyleSheet.create(styleConf);

function EmployeeCard(props) {
    const { firstName, lastName, slug, email } = props.data;

    return (
        <Link to={`/employee/${slug}`}>
            <article className={css(styles.article)}>
                <h4>{lastName}, {firstName}</h4>
                <h5>Username: {slug}</h5>
                <h5>Email: {email}</h5>
            </article>
        </Link>
    );
}

export default EmployeeCard;