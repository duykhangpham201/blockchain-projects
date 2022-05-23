import React from 'react'

const WaitingScreen = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            maxWidth: '550px',
            textAlign: 'center',

        }}>
            <h2>Welcome to RollSwap!</h2>
            <p>Connect Wallet to Continue</p>
            <img 
                src= "https://64.media.tumblr.com/2bcbed1eb6da72c537a156b716a5b84a/56911921465afa79-3e/s2048x3072/f3a47c3e0a22673444cde289895ee07a1007549a.gifv"
                alt="This is a gif"
            />     
        </div>
    )
}

export default WaitingScreen
