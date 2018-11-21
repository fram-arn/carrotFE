import React from 'react';

import AuthContext from './auth-context';

const AuthStatus = () => (
    <AuthContext.Consumer>
      {authContext => {
        return (
            <a href="/login" style={{float:'right', padding: '0 15px'}}>
                {authContext.isAuth ? 'Logout' : 'Login'}
            </a>
        );
      }}
    </AuthContext.Consumer>
  );

export default AuthStatus;
