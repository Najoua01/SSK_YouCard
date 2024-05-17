import React from 'react'
import './Footer.css'
import facebook from '../../assets/images/facebook.png'
import twitter from '../../assets/images/twitter.png'
import linkedin from '../../assets/images/linkedin.png'
import instagram from '../../assets/images/instagram.png'
import tiktok from '../../assets/images/tik-tok.png'


function Footer () {
  return (
    <div className='main-footer'>
        <div className='footer-text'>
            <div className='row'>
                <div className='col'>
                    <h2>A propos de YouCard</h2>
                    <ul className='list-unstyled'>
                    <li>Conditions d'utilisation du site</li>
                    <li>Conditions générales de partenariat</li>
                    <li>Règlement applicable aux bénéficiaires</li>
                    </ul>
                </div>
                <div className='col'>
                    <h2>Contactez nous</h2>
                    <ul className='list-unstyled'>
                    <li>Avenue du Port 16 , local 4P14 1080 Bruxelles</li>
                    <li>Formulaire de contact</li>
                    </ul>
                </div>
                <div className='col'>
                    <h2>Plus de questions ? </h2>
                    <ul className='list-unstyled'>
                    <li>Retrouvez ici notre FAQ</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='footer-rs'>
            <img src={facebook} alt='Facebook' /> 
            <img src={twitter} alt='Twitter' />
            <img src={linkedin} alt='LinkedIn' />
            <img src={instagram} alt='Instagram' />
            <img src={tiktok} alt='TikTok' />
        </div>
    </div>
  )
}

export default Footer

