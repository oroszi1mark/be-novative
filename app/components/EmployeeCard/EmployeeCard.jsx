import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import styleConf from './EmployeeCard.styles';

const styles = StyleSheet.create(styleConf);

function EmployeeCard(props) {
    const { firstName, lastName, slug, email } = props.data;

    return (
        <Link to={`/employee/${slug}`} className={css(styles.link)}>
            <article className={css(styles.article)}>
                <h4>{lastName}, {firstName}</h4>
                <h5>Username: {slug}</h5>
                <h5>Email: {email}</h5>
            </article>
        </Link>
    );
}

EmployeeCard.propTypes = {
    data: PropTypes.objectOf(PropTypes.string).isRequired
};

export default EmployeeCard;