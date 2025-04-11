import React from 'react';
import styles from '../..//styles/app/cinema.module.css'; // Assurez-vous que le chemin est correct

const CinemaPage: React.FC = () => {
    return (
        <div className={styles.background}>
            <main>
                <h1>Contact</h1>
                <p>Bienvenue sur la page de cinéma !</p>
            </main>
        </div>
    );
};

export default CinemaPage;