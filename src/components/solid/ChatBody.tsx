import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { For, createSignal, onMount } from 'solid-js';
import { format } from 'date-fns';
import { collections } from '../../lib/firebase/client';
import type { BookingChatMessage } from '../../lib/firebase/types';

export type ChatBodyProps = {
  bookingId: string;
  expertName: string;
  class?: string;
};

type ChatMessageGroup = {
  messages: BookingChatMessage[];
  isSenderUser: boolean;
};

const ChatBody = (props: ChatBodyProps) => {
  const [messageGroups, setMessageGroups] = createSignal<ChatMessageGroup[]>([]);
  let listEl: HTMLUListElement | undefined = undefined;

  onMount(() => {
    const q = query(collections.bookingChatMessages(props.bookingId), orderBy('sentAt', 'asc'));

    onSnapshot(q, (snap) => {
      const groups = snap.docs.reduce<ChatMessageGroup[]>((acc, curr) => {
        const data: BookingChatMessage = {
          id: curr.id,
          ...curr.data(),
        };

        if (acc.length === 0 || acc[acc.length - 1].isSenderUser !== data.isSenderUser) {
          return acc.concat([{ messages: [data], isSenderUser: data.isSenderUser }]);
        }

        return acc.slice(0, acc.length - 1).concat({
          isSenderUser: data.isSenderUser,
          messages: acc[acc.length - 1].messages.concat(data),
        });
      }, []);

      setMessageGroups(groups);

      if (listEl !== undefined) listEl.scrollTo({ behavior: 'smooth', top: listEl.scrollHeight });
    });
  });

  return (
    <ul ref={listEl} class={`flex-1 flex flex-col gap-1 pb-4 px-2 overflow-y-auto ${props.class}`}>
      <For each={messageGroups()}>
        {(group) => (
          <>
            <For each={group.messages}>
              {(message) => (
                <li
                  class="flex gap-2 items-center"
                  classList={{
                    'self-start': !message.isSenderUser,
                    'self-end': message.isSenderUser,
                  }}
                >
                  <div
                    class="text-slate-600 text-sm select-none"
                    classList={{
                      'order-1': !message.isSenderUser,
                      '-order-1': message.isSenderUser,
                    }}
                  >
                    {format(message.sentAt.toDate(), 'HH:mm')}
                  </div>

                  <div
                    class="px-4 py-2 w-fit rounded-md"
                    classList={{
                      border: !message.isSenderUser,
                      'bg-primary text-white': message.isSenderUser,
                      'order-1': message.isSenderUser,
                      '-order-1': !message.isSenderUser,
                    }}
                  >
                    {message.body}
                  </div>
                </li>
              )}
            </For>
          </>
        )}
      </For>
    </ul>
  );
};

export default ChatBody;
