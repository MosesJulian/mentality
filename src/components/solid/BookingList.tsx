import { For, createSignal, onMount } from 'solid-js';
import { BOOKING_HOUR_FORMAT, type Booking } from '../../lib/firebase/types';
import PrimaryButton from './shared/PrimaryButton';
import { onSnapshot, query, where } from 'firebase/firestore';
import { collections } from '../../lib/firebase/client';
import { IconMapPin, IconBuildingHospital, IconClock } from '@tabler/icons-solidjs';
import { addHours, format, parse, startOfHour } from 'date-fns';

export type BookingListProps = {
  class?: string;
  userId: string;
};

const BookingList = (props: BookingListProps) => {
  const [bookings, setBookings] = createSignal<(Booking & { hourString: string })[]>();

  onMount(() => {
    const q = query(collections.bookings, where('userId', '==', props.userId));

    onSnapshot(q, (snap) =>
      setBookings(
        snap.docs.map((doc) => {
          const referenceDate = startOfHour(new Date());
          const startTime = parse(doc.data().hour, BOOKING_HOUR_FORMAT, referenceDate);
          const endTime = addHours(startTime, 1);

          return {
            id: doc.id,
            hourString: `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`,
            ...doc.data(),
          };
        }),
      ),
    );
  });

  const moneyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <ul class={`grid grid-cols-3 gap-4 ${props.class}`}>
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
                <h3 class="text-xl font-semibold">{booking.expertFullName}</h3>
                <p class="text-ellipsis line-clamp-3 text-xs text-slate-600 mt-1">
                  {booking.expertBiography}
                </p>

                <div class="flex items-center mt-4 gap-2 text-slate-600 text-sm">
                  <IconMapPin size={18} />
                  <span class="leading-[1.2] flex-1">{booking.expertLocation}</span>
                </div>

                <div class="flex items-center mt-2 gap-2 text-slate-600 text-sm">
                  <IconBuildingHospital size={18} />
                  <span class="leading-[1.2] flex-1">{booking.expertClinicName}</span>
                </div>

                <div class="flex items-center mt-2 gap-2 text-slate-600 text-sm">
                  <IconClock size={18} />
                  <span class="leading-[1.2] flex-1">
                    {booking.hourString} @ {moneyFormatter.format(booking.expertPricePerHour)}
                  </span>
                </div>

                <a href={`/bookings/${booking.id}/chat`}>
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
