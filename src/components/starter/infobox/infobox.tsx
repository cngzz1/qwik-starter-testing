import {
  FunctionComponent,
  JSXNode,
  OnRenderFn,
  Slot,
  component$,
} from '@builder.io/qwik';
import styles from './infobox.module.css';

const onMount: OnRenderFn<{}> = () => {
  const titleComponent: JSXNode<
    string | FunctionComponent<Record<string, unknown>>
  > = (
    <div class={styles.infobox}>
      <h3>
        <Slot name="title" />
      </h3>
      <Slot />
    </div>
  );
  return titleComponent;
};
export default component$<unknown, {}>(onMount);
