import { Signal, component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  routeAction$,
  zod$,
  z,
  Form,
ActionStore,
DocumentHeadValue,
DocumentHeadProps,
Loader,
} from '@builder.io/qwik-city';
import styles from './todolist.module.css';

interface ListItem<E> {
  text: E;
}

export const list: Array<ListItem<string>> = [];

export const useListLoader: Loader<ListItem<string>[]> = routeLoader$<Array<ListItem<string>>>(() => {
  return list;
});

export const useAddToListAction = routeAction$(
  (item: {
    text: string;
}) => {
    list.push(item);
    return {
      success: true,
    };
  },
  zod$<{
    text: z.ZodString;
}>({
    text: z.string().trim().min(1),
  })
);

export default component$<unknown, {}>(() => {
  const list: Readonly<Signal<Array<ListItem<string>>>> = useListLoader();
  const action: ActionStore<{
    success?: boolean | undefined;
    formErrors?: undefined;
    fieldErrors?: undefined;
    failed?: undefined;
} | {
    formErrors?: string[] | undefined;
    fieldErrors?: {
        text?: string[] | undefined;
    } | undefined;
    failed?: true | undefined;
    success?: undefined;
}, { text: string; }, false>
 = useAddToListAction();

  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">TODO</span> List
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        {(list.value.length && (
          <ul class={styles.list}>
            {list.value.map((item, index) => (
              <li key={`items-${index}`}>{item.text}</li>
            ))}
          </ul>
        )) || <span class={styles.empty}>No items found</span>}
      </div>

      <div class="container container-center">
        <Form action={action} spaReset>
          <input type="text" name="text" required class={styles.input} />{' '}
          <button type="submit" class="button-dark">
            Add item
          </button>
        </Form>

        <p class={styles.hint}>PS: This little app works even when JavaScript is disabled.</p>
      </div>
    </>
  );
});

export const head: DocumentHeadValue | ((props: DocumentHeadProps) => DocumentHeadValue) = {
  title: 'Qwik Todo List',
};
