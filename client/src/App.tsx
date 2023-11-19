import React, { useState, useEffect, useContext } from 'react';

import AppRouter from './routes/AppRouter';

import './App.scss';

const App : React.FC = () => {
    return (
        <AppRouter/>
    )
}

export default App;