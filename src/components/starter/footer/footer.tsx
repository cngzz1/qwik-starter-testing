import { OnRenderFn, Signal, component$ } from '@builder.io/qwik';
import { useServerTimeLoader } from '~/routes/layout';
import styles from './footer.module.css';

const onRenderFunction: OnRenderFn<{}> = () => {
  const serverTime: Readonly<
    Signal<{
      date: string;
    }>
  > = useServerTimeLoader();

  return (
    <footer>
      <div class="container">
        <a href="https://www.builder.io/" target="_blank" class={styles.anchor}>
          <span>Made with ♡ by Builder.io</span>
          <span class={styles.spacer}>|</span>
          <span>{serverTime.value.date}</span>
        </a>
      </div>
    </footer>
  );
};
export default component$<unknown, {}>(onRenderFunction);
