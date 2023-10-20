import { For, createSignal, onMount } from 'solid-js';
import { type Booking } from '../../lib/firebase/types';
import PrimaryButton from './shared/PrimaryButton';
import { onSnapshot } from 'firebase/firestore';
import { collections } from '../../lib/firebase/client';
import { IconStar, IconMapPin, IconBuildingHospital, IconClock } from '@tabler/icons-solidjs';

export type BookingListProps = {
  class?: string;
};

const BookingList = (props: BookingListProps) => {
  const [bookings, setBookings] = createSignal<Booking[]>();

  onMount(() => {
    onSnapshot(collections.bookings, (snap) =>
      setBookings(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      ),
    );
  });

  return (
    <ul class={`flex flex-col gap-4 ${props.class}`}>
      <For each={bookings()}>
        {(booking) => (
          <li>
            <article class="rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md">
              <img
                class="w-full max-h-[240px] object-cover rounded-t-lg select-none"
                src="https://picsum.photos/seed/picsum/200/300"
                alt=""
              />

              <div class="px-3 pt-2 pb-4">
                <h3 class="text-xl font-semibold">Moses Julian</h3>
                <p class="text-ellipsis line-clamp-3 text-sm text-slate-600">
                  Moses Julian, M.Psi, Psikolog adalah Psikolog Klinis yang aktif melayani pasien di
                  Klinik Aditi Psychological Center. Moses Julian, M.Psi, Psikolog mendapatkan gelar
                  Psikolog Klinis setelah menamatkan pendidikan di Universitas Airlangga,
                  Universitas Padjadjaran.
                </p>

                <div class="mt-3 flex items-center gap-2 text-slate-600 text-sm">
                  <div class="flex items-center gap-2">
                    <IconStar size={18} />
                    <span class="leading-[1.2] flex-1">4.7</span>
                  </div>

                  <div class="w-px h-[16px] bg-slate-600"></div>

                  <div class="leading-[1.2]">100 consultations</div>
                </div>

                <div class="flex items-center mt-2 gap-2 text-slate-600 text-sm">
                  <IconMapPin size={18} />
                  <span class="leading-[1.2] flex-1">Jakarta Timur</span>
                </div>

                <div class="flex items-center mt-2 gap-2 text-slate-600 text-sm">
                  <IconBuildingHospital size={18} />
                  <span class="leading-[1.2] flex-1">Klinik Julian Psychological Center</span>
                </div>

                <div class="flex items-center mt-2 gap-2 text-slate-600 text-sm">
                  <IconClock size={18} />
                  <span class="leading-[1.2] flex-1">13:00 - 14:00</span>
                </div>

                <a href="/chats/FnclurGmBpAxyg8shKmo">
                  <PrimaryButton class="mt-6 w-full">Chat</PrimaryButton>
                </a>
              </div>
            </article>
          </li>
        )}
      </For>
    </ul>
  );
};

export default BookingList;
