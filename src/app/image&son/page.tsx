// app/contact/page.tsx

import React from 'react';
import styles from '../..//styles/app/contact.module.css'; // Assurez-vous que le chemin est correct

const ContactPage: React.FC = () => {
    return (
        <div className={styles.background}>
            <main>
                <h1>Contact</h1>
                <p>Bienvenue sur la page IMAGE ET SON !</p>
            </main>
        </div>
    );
};

export default ContactPage;
