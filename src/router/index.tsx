import { lazy, ReactNode, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import LayoutPage from '../pages/Layout';
const Home = lazy(() => import('../pages/Home'));
const User = lazy(() => import('../pages/User'));
const Detail = lazy(() => import('../pages/Detail'));
const Login = lazy(() => import('../pages/Login'));

const lazyLoad = (children: ReactNode): ReactNode => {
    return (
        <Suspense fallback={<>loading...</>}>
            {children}
        </Suspense>
    )
}

const router: RouteObject[] = [
    {
        path: '/',
        element: <LayoutPage />,
        children: [
            { index: true, element: lazyLoad(<Home />) },
            { path: '/user', element: lazyLoad(<User />) },
            { path: '/user/detail/:id', element: lazyLoad(<Detail />) }
        ]
    },
    { path: '/login', element: lazyLoad(<Login />) }
];

export default router;