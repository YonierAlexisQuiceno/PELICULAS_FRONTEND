import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

import Dashboard from '../pages/Dashboard';

import { GeneroList, GeneroForm } from '../pages/GeneroPages';
import { DirectorList, DirectorForm } from '../pages/DirectorPages';
import { ProductoraList, ProductoraForm } from '../pages/ProductoraPages';
import { TipoList, TipoForm } from '../pages/TipoPages';
import ContentList from '../pages/ContentList'; // Media List
import MediaForm from '../pages/MediaForm';
import MediaDetailView from '../pages/MediaDetailView';
import Settings from '../pages/Settings';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin">
                    <DashboardLayout>
                        <Switch>
                            <Route exact path="/admin/dashboard" component={Dashboard} />
                            
                            {/* Generos */}
                            <Route exact path="/admin/generos" component={GeneroList} />
                            <Route exact path="/admin/generos/new" component={GeneroForm} />
                            <Route exact path="/admin/generos/edit/:id" component={GeneroForm} />

                            {/* Directores */}
                            <Route exact path="/admin/directores" component={DirectorList} />
                            <Route exact path="/admin/directores/new" component={DirectorForm} />
                            <Route exact path="/admin/directores/edit/:id" component={DirectorForm} />

                            {/* Productoras */}
                            <Route exact path="/admin/productoras" component={ProductoraList} />
                            <Route exact path="/admin/productoras/new" component={ProductoraForm} />
                            <Route exact path="/admin/productoras/edit/:id" component={ProductoraForm} />

                            {/* Tipos */}
                            <Route exact path="/admin/tipos" component={TipoList} />
                            <Route exact path="/admin/tipos/new" component={TipoForm} />
                            <Route exact path="/admin/tipos/edit/:id" component={TipoForm} />

                            {/* Medias */}
                            <Route exact path="/admin/medias" component={ContentList} />
                            <Route exact path="/admin/medias/new" component={MediaForm} />
                            <Route exact path="/admin/medias/edit/:id" component={MediaForm} />
                            <Route exact path="/admin/medias/view/:id" component={MediaDetailView} />

                            {/* Settings */}
                            <Route exact path="/admin/settings" component={Settings} />

                            <Redirect to="/admin/dashboard" />
                        </Switch>
                    </DashboardLayout>
                </Route>
                <Redirect to="/admin/dashboard" />
            </Switch>
        </Router>
    );
};

export default AppRouter;
