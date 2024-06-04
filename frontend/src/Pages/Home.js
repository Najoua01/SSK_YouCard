import React from "react";
import About from '../Components/PageHome/About/About';
import CarteAv from '../Components/PageHome/CarteAv/CarteAv';
import Une from '../Components/PageHome/Une/Une';
import Agenda from '../Components/PageHome/Agenda/Agenda';
import Actu from '../Components/PageHome/Actu/Actu';

function Home () {
    return (
        <div>
            <About />
            <CarteAv />
            <Une />
            <Agenda />
            <Actu />
        </div>
    );
}

export default Home;