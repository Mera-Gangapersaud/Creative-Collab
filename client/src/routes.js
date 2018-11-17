import Home from './components/home';
import Story from './components/story';

const routes = {
  home: { path: '/', component: Home, exact: true },
  story: { path: '/story', component: Story },
};

export default routes;
