import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from 'react-dom';

import EmployeeList from 'components/EmployeeList/EmployeeList';
import EmployeeEditor from 'components/EmployeeEditor/EmployeeEditor';

function App() {
    return (
        <main>
            <h1>Demo</h1>

            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={EmployeeList} />
                    <Route path="/new" render={route => <EmployeeEditor history={route.history} />} />
                    <Route path="/employee/:slug" render={route => <EmployeeEditor slug={route.match.params.slug} history={route.history} />} />
                </Switch>
            </BrowserRouter>
        </main>
    );
}

render(<App />, document.getElementById('app'));