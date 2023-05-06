import React, { useState, useEffect } from 'react';
import SubmitForm from '../components/SubmitForm';
import EntryTransition from '../components/EntryTransition';


const HomePage = () => {
    return (
        <>
            <EntryTransition></EntryTransition>
            <div className="h-[15vh]"></div>
            <SubmitForm/>
            <div className="h-[10vh]"></div>
        </>
    )
}

export default HomePage;