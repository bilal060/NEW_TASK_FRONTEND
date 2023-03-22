import { useLocation } from 'react-router-dom';
import '../src/Common/common.css';
import ContentRoutes from './Common/Content/ContentRoutes';
import AppLayout from './Common/Layout';
import RegistrationRoutes from './Common/Registration/routes';

function App() {
  const homepage = ['/newsfeed', '/articles',]
  const location = useLocation();

  if (homepage.includes(location.pathname)) {
    return (
      <AppLayout>
        <ContentRoutes />
      </AppLayout>
    );
  }
  else
    return (
      <RegistrationRoutes />
    );
}

export default App;
