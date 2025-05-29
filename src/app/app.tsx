import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { store } from 'store/appStore';
import { Authorization } from 'features/user';
import { PageLoader } from 'components';
import { ErrorBoundary } from './ErrorBoundary';
import { theme } from './theme';
import { appRouter } from './appRoutes';
// import { SocketProvider } from './SocketProvider';

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme='dark'>
        <ErrorBoundary>
          <Authorization />
          <Notifications position='top-right' />
          <Suspense fallback={<PageLoader />}>
            {/* <SocketProvider> */}
            <RouterProvider router={appRouter()} />
            {/* </SocketProvider> */}
          </Suspense>
        </ErrorBoundary>
      </MantineProvider>
    </Provider>
  );
}
