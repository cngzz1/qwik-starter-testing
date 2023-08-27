import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { Loader, routeLoader$ } from '@builder.io/qwik-city';

import Header from '~/components/starter/header/header';
import Footer from '~/components/starter/footer/footer';

import styles from './styles.css?inline';
import { JSX } from '@builder.io/qwik/jsx-runtime';

const buildDateCallback: () => {
  date: string;
} = () => {
  return {
    date: new Date().toISOString(),
  };
};
export const useServerTimeLoader: Loader<{
  date: string;
}> = routeLoader$<{
  date: string;
}>(buildDateCallback);
const buildAppCallBack: () => JSX.Element = () => {
  useStyles$(styles);
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
};
export default component$<unknown, {}>(buildAppCallBack);
