import { createSignal } from 'solid-js';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { collections } from '../../lib/firebase/client';
import PrimaryButton from './shared/PrimaryButton';

export type ChatBoxProps = {
  bookingId: string;
  class?: string;
};

const ChatBox = (props: ChatBoxProps) => {
  const [message, setMessage] = createSignal('');

  const handleSend = (e: SubmitEvent) => {
    e.preventDefault();

    const messageBody = message().trim();
    if (messageBody.length === 0) return;

    addDoc(collections.bookingChatMessages(props.bookingId), {
      body: messageBody,
      isSenderUser: true,
      sentAt: serverTimestamp(),
      bookingId: props.bookingId,
    });

    setMessage('');
  };

  return (
    <form autocomplete="off" class={`flex items-center gap-2 ${props.class}`} onSubmit={handleSend}>
      <input
        class="rounded-md flex-1 border-2 px-4 py-2 transition-[border] duration-200 focus-visible:outline-none focus-visible:border-primary"
        type="text"
        placeholder="Say something..."
        value={message()}
        onInput={(e) => setMessage(e.currentTarget.value)}
      />

      <PrimaryButton class="px-6">Send</PrimaryButton>
    </form>
  );
};

export default ChatBox;
