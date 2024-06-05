import React from "react";
import Title from '../Components/PageActu/Title/Title'
import Carrousel from '../Components/PageActu/Carrousel/Carrousel';
import Titre2 from '../Components/PageActu/Titre2/Titre2';
import SearchActu from '../Components/PageActu/SearchActu/SearchActu';
import CardsActu from '../Components/PageActu/CardsActu/CardsActu';

function Actualites() {
    return (
        <div>
            <Title/>
            <Carrousel/>
            <Titre2/>
            <SearchActu/>
            <CardsActu/>
        </div>
    );
}

export default Actualites;