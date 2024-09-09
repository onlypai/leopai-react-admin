import Router from './router';
import { Helmet } from 'react-helmet-async';
import Logo from './assets/logo.svg';
function App() {
  return (
    <>
      <Helmet>
        <title>Leopai React Admin</title>
        <link rel="icon" type="image/svg+xml" href={Logo} />
      </Helmet>
      <Router />
    </>
  );
}

export default App;
